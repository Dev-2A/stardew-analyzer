"""파서 동작 확인용 임시 스크립트 (개발용)"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from app.parser.save_parser import StardewSaveParser

if __name__ == "__main__":
    # 테스트용 최소 XML
    sample_xml = b"""<?xml version="1.0" encoding="utf-8"?>
<SaveGame xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <player>
    <name>Tangi</name>
    <farmName>Moonlit</farmName>
    <money>50000</money>
    <totalMoneyEarned>300000</totalMoneyEarned>
    <millisecondsPlayed>7200000</millisecondsPlayed>
    <experiencePoints>
      <int>1300</int>
      <int>770</int>
      <int>380</int>
      <int>100</int>
      <int>0</int>
    </experiencePoints>
    <friendshipData>
      <item>
        <key><string>Abigail</string></key>
        <value>
          <Friendship>
            <Points>1750</Points>
            <GiftsThisWeek>0</GiftsThisWeek>
            <GiftsToday>0</GiftsToday>
            <Status>Friendly</Status>
          </Friendship>
        </value>
      </item>
      <item>
        <key><string>Penny</string></key>
        <value>
          <Friendship>
            <Points>2500</Points>
            <GiftsThisWeek>1</GiftsThisWeek>
            <GiftsToday>0</GiftsToday>
            <Status>Dating</Status>
          </Friendship>
        </value>
      </item>
      <item>
        <key><string>Robin</string></key>
        <value>
          <Friendship>
            <Points>500</Points>
            <GiftsThisWeek>0</GiftsThisWeek>
            <GiftsToday>0</GiftsToday>
            <Status>Friendly</Status>
          </Friendship>
        </value>
      </item>
    </friendshipData>
  </player>
  <whichFarm>0</whichFarm>
  <year>2</year>
  <currentSeason>summer</currentSeason>
  <dayOfMonth>15</dayOfMonth>
  <locations>
    <GameLocation xsi:type="Farm">
      <buildings>
        <Building><buildingType>Barn</buildingType></Building>
        <Building><buildingType>Coop</buildingType></Building>
      </buildings>
      <animals>
        <Animal><type>Cow</type></Animal>
        <Animal><type>Chicken</type></Animal>
        <Animal><type>Chicken</type></Animal>
      </animals>
      <terrainFeatures>
        <item>
          <value>
            <TerrainFeature xsi:type="HoeDirt">
              <crop><indexOfHarvest>24</indexOfHarvest></crop>
            </TerrainFeature>
          </value>
        </item>
      </terrainFeatures>
      <objects />
    </GameLocation>
  </locations>
</SaveGame>"""

    parser = StardewSaveParser(sample_xml)
    import json
    print(json.dumps(parser.parse_all(), ensure_ascii=False, indent=2))