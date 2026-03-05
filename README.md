# 🌾 Stardew Analyzer

스타듀밸리 세이브 파일(.xml)을 업로드하면 농장 현황, 주민 우정도, 스킬 레벨,  
퍼펙션 달성률을 시각화해서 보여주는 웹 분석 서비스입니다.

**설치 없이 파일 업로드만으로 바로 분석 가능합니다.**

---

## ✨ 주요 기능

| 기능 | 설명 |
| --- | --- |
| 🏡 농장 기본 정보 | 플레이어명, 농장명, 자금, 날짜, 플레이 시간 |
| 🌟 스킬 레벨 시각화 | 농사·낚시·채집·광업·전투 막대 차트 |
| 🏠 농장 현황 | 건물·동물·작물 수, 건물 파이 차트 |
| 💛 주민 우정도 | D3.js 레이더 차트 + 전체 주민 하트 바 |
| 🎯 퍼펙션 달성률 | 항목별 진행 바 + 원형 전체 달성률 트래커 |

---

## 🛠 기술 스택

| 영역 | 기술 |
| --- | --- |
| Backend | Python 3.10+, FastAPI, Pydantic |
| Frontend | React 18, Vite, Tailwind CSS 3.x |
| 시각화 | Recharts, D3.js |
| 파싱 | Python xml.etree (표준 라이브러리) |

---

## 🚀 실행 방법

### 사전 준비

- Python 3.10 이상
- Node.js 18 이상

### 백엔드 실행

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

백엔드 서버: `http://localhost:8000`  
API 문서 (Swagger UI): `http://localhost:8000/docs`

### 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

프론트엔드: `http://localhost:5173`

---

## 📁 세이브 파일 위치

```text
Windows: %AppData%\StardewValley\Saves\[플레이어명]\[플레이어명]
```

확장자가 없는 파일을 업로드하면 됩니다. (내부적으로 XML 형식)

---

## 📂 프로젝트 구조

```text
stardew-analyzer/
├── backend/
│   └── app/
│       ├── main.py              # FastAPI 앱 엔트리포인트
│       ├── api/
│       │   └── analyze.py       # 파일 업로드 + 분석 API
│       ├── core/
│       │   └── config.py        # 설정 모듈
│       ├── models/
│       │   └── analysis.py      # Pydantic 응답 모델
│       └── parser/
│           ├── save_parser.py   # XML 파서 (핵심 로직)
│           └── villagers.py     # 주민 메타데이터
└── frontend/
    └── src/
        ├── api/
        │   └── client.js        # API 클라이언트
        ├── components/
        │   ├── Layout.jsx
        │   ├── BasicInfoCard.jsx
        │   ├── SkillsChart.jsx
        │   ├── FarmStatusCard.jsx
        │   ├── FriendshipRadar.jsx
        │   ├── PerfectionTracker.jsx
        │   └── CircularProgress.jsx
        └── hooks/
            └── useRadarChart.js # 레이더 차트 좌표 계산
```

---

## 🔮 향후 개선 아이디어

- [ ] 선적 목록 / 요리 / 장인 기술 퍼펙션 항목 추가
- [ ] 농장 타일맵 시각화
- [ ] 다회차 세이브 파일 비교 기능
- [ ] Vercel + Railway 배포

---

## ⚠️ 면책 조항

Stardew Valley는 ConcernedApe의 상표입니다.  
이 프로젝트는 팬 메이드 도구이며 ConcernedApe와 무관합니다.

---

## 📄 License

MIT © 2026 Dev-2A
