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
    
    # ── 전체 파싱 ───────────────────────────────────────────
    
    def parse_all(self) -> dict:
        """전체 분석 결과 반환"""
        return {
            "basic_info": self.get_basic_info(),
            "skills": self.get_skills(),
        }