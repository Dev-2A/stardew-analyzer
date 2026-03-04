from pydantic import BaseModel


class BasicInfo(BaseModel):
    player_name: str = ""
    farm_name: str = ""
    money: int = 0
    total_money_earned: int = 0
    year: int = 1
    season: str = ""
    farm_type: str = ""
    hours_played: int = 0


class Skills(BaseModel):
    농사: int = 0
    낚시: int = 0
    채집: int = 0
    광업: int = 0
    전투: int = 0


class FarmStatus(BaseModel):
    building_count: int = 0
    building_types: dict[str, int] = {}
    animal_count: int = 0
    animal_types: dict[str, int] = {}
    crop_count: int = 0
    object_count: int = 0


class VillagerFriendship(BaseModel):
    name: str
    hearts: int = 0
    max_hearts: int = 10
    points: int = 0
    status: str = "Friendly"


class AnalysisResult(BaseModel):
    basic_info: BasicInfo = BasicInfo()
    skills: Skills = Skills()
    farm_status: FarmStatus = FarmStatus()
    friendship: list[VillagerFriendship] = []