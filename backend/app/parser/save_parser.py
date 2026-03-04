import xml.etree.ElementTree as ET
from pathlib import Path


class StardewSaveParser:
    """스타듀밸리 세이브 파일(.xml) 파서"""
    
    def __init__(self, file_content: bytes):
        self.root = ET.fromstring(file_content)
    
    # ── 공통 헬퍼 ──────────────────────────────────────────
    
    def _get_text(self, node, path: str, default="") -> str:
        """XPath로 텍스트 값 추출"""
        el = node.find(path)
        return el.text if el is not None and el.text else default
    
    def _get_int(self, node, path: str, default: int = 0) -> int:
        """XPath로 정수 값 추출"""
        try:
            return int(self._get_text(node, path, str(default)))
        except (ValueError, TypeError):
            return default
    
    # ── 플레이어 기본 정보 ──────────────────────────────────
    
    def get_basic_info(self) -> dict:
        """플레이어 기본 정보 반환"""
        player = self.root.find("player")
        if player is None:
            return {}
        
        season_map = {
            "spring": "봄", "summer": "여름",
            "fall": "가을", "winter": "겨울"
        }
        farm_type_map = {
            "0": "표준", "1": "강가", "2": "숲",
            "3": "언덕 꼭대기", "4": "황무지", "5": "사막",
            "6": "목장", "7": "매직"
        }
        
        season_raw = self._get_text(self.root, "currentSeason", "spring")
        farm_type_raw = self._get_text(self.root, "wichFarm", "0")
        
        return {
            "player_name": self._get_text(player, "name"),
            "farm_name": self._get_text(player, "farmName"),
            "money": self._get_int(player, "money"),
            "total_money_earned": self._get_int(player, "totalMoneyEarned"),
            "year": self._get_int(self.root, "year", 1),
            "season": season_map.get(season_raw, season_raw),
            "day": self._get_int(self.root, "dayOfMonth", 1),
            "farm_type": farm_type_map.get(farm_type_raw, "표준"),
            "hours_played": self._get_int(player, "millisecondsPlayed") // 3600000,
        }
    
    # ── 스킬 레벨 ───────────────────────────────────────────
    
    def get_skills(self) -> dict:
        """스킬 레벨 반환 (0~10)"""
        player = self.root.find("player")
        if player is None:
            return {}
        
        skill_names = ["farming", "fishing", "foraging", "mining", "combat"]
        skill_labels = ["농사", "낚시", "채집", "광업", "전투"]
        
        skills_el = player.find("experiencePoints")
        if skills_el is None:
            return {label: 0 for label in skill_labels}
        
        xp_values = [int(v.text or "0") for v in skills_el]
        
        # XP -> 레벨 변환 테이블
        xp_table = [0, 100, 380, 770, 1300, 2150, 3300, 4800, 6900, 10000, 15000]
        
        def xp_to_level(xp: int) -> int:
            for lv, threshold in enumerate(xp_table):
                if xp < threshold:
                    return max(0, lv - 1)
            return 10
        
        return {
            label: xp_to_level(xp_values[i]) if i < len(xp_values) else 0
            for i, label in enumerate(skill_labels)
        }
    
    # ── 농장 현황 ───────────────────────────────────────────
    
    def _get_farm_location(self):
        """Farm 타입 GameLocation 노드 반환"""
        locations = self.root.find("locations")
        if locations is None:
            return None
        for loc in locations:
            if loc.get("{http://www.w3.org/2001/XMLSchema-instance}type") == "Farm":
                return loc
        return None
    
    def get_farm_status(self) -> dict:
        """농장 현황 반환"""
        farm = self._get_farm_location()
        if farm is None:
            return {}
        
        # 건물 수
        buildings = farm.find("buildings")
        building_count = len(list(buildings)) if buildings is not None else 0
        
        # 건물 종류별 카운트
        building_types: dict[str, int] = {}
        if buildings is not None:
            for b in buildings:
                btype = self._get_text(b, "buildingType", "Unknown")
                building_types[btype] = building_types.get(btype, 0) + 1
        
        # 동물 수
        animals = farm.find("animals")
        animal_count = 0
        animal_types: dict[str, int] = {}
        if animals is not None:
            for animal in animals:
                animal_count += 1
                atype = self._get_text(animal, "type", "Unknown")
                animal_types[atype] = animal_types.get(atype, 0) + 1
        
        # 작물 수 (terrainFeatures 내 HoeDirt -> crop 존재 여부)
        terrain = farm.find("terrainFeatures")
        crop_count = 0
        if terrain is not None:
            for item in terrain.iter("TerrainFeature"):
                ftype = item.get("{http://www.w3.org/2001/XMLSchema-instance}type", "")
                if ftype == "HoeDirt":
                    if item.find("crop") is not None:
                        crop_count += 1
        
        # 배치된 오브젝트 수
        objects = farm.find("objects")
        object_count = len(list(objects)) if objects is not None else 0
        
        return {
            "building_count": building_count,
            "building_types": building_types,
            "animal_count": animal_count,
            "animal_types": animal_types,
            "crop_count": crop_count,
            "object_count": object_count,
        }
    
    # ── 전체 파싱 ───────────────────────────────────────────
    
    def parse_all(self) -> dict:
        """전체 분석 결과 반환"""
        return {
            "basic_info": self.get_basic_info(),
            "skills": self.get_skills(),
            "farm_status": self.get_farm_status(),
        }