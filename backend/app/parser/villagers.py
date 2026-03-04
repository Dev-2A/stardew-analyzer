"""스타듀밸리 주민 메타데이터"""

# 결혼 가능 주민
MARRIAGEABLE = {
    "Abigail", "Alex", "Elliott", "Emily", "Haley",
    "Harvey", "Leah", "Maru", "Penny", "Sam", "Sebastian", "Shane",
}

# 일반 주민 (우정도 추적 대상)
REGULAR_VILLAGERS = {
    "Caroline", "Clint", "Demetrius", "Dwarf", "Evelyn",
    "George", "Gil", "Gus", "Jas", "Jodi", "Kent", "Krobus",
    "Leo", "Lewis", "Linus", "Marnie", "Pam", "Pierre",
    "Robin", "Sandy", "Vincent", "Willy", "Wizard",
}

ALL_VILLAGERS = MARRIAGEABLE | REGULAR_VILLAGERS

# 주민별 최대 하트 수
def get_max_hearts(name: str, status: str) -> int:
    if status in ("Dating", "Married"):
        return 14
    if name in MARRIAGEABLE:
        return 10
    if name == "Krobus":
        return 14
    return 10