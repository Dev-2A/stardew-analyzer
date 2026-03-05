import CircularProgress from "./CircularProgress";

const ITEM_ICONS = {
  skills: "🌟",
  friendship: "💛",
  stardrops: "⭐",
  golden_clock: "🕰️",
  walnuts: "🥜",
};

const GRADE = [
  { min: 100, label: "완벽한 농부 🏆", color: "#F5D76E" },
  { min: 75, label: "숙련된 농부 🌿", color: "#5D9E4E" },
  { min: 50, label: "성장 중인 농부 🌱", color: "#5B8DD9" },
  { min: 25, label: "초보 농부 🐣", color: "#E8A838" },
  { min: 0, label: "농장 입문자 🌾", color: "#E05C5C" },
];

function getGrade(percent) {
  return GRADE.find((g) => percent >= g.min) ?? GRADE[GRADE.length - 1];
}

export default function PerfectionTracker({ perfection }) {
  const { total_percent, items } = perfection;
  const grade = getGrade(total_percent);

  return (
    <div className="bg-stardew-card border-2 border-stardew-brown rounded-2xl p-6 shadow-sm">
      <h2 className="text-stardew-brown font-bold text-lg mb-4">
        🎯 퍼펙션 달성률
      </h2>

      {/* 전체 점수 + 등급 */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <CircularProgress percent={total_percent} size={140} />
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <span className="text-xl font-bold" style={{ color: grade.color }}>
            {grade.label}
          </span>
          <p className="text-sm text-gray-500">
            총{" "}
            <span className="font-bold text-stardew-brown">
              {total_percent.toFixed(1)}%
            </span>{" "}
            달성
          </p>
          <p className="text-xs text-gray-400">
            모든 항목을 완료하면 100%가 됩니다
          </p>
        </div>
      </div>

      {/* 항목별 진행 바 */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.key}>
            {/* 항목 헤더 */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span>{ITEM_ICONS[item.key] ?? "📋"}</span>
                <span className="text-sm font-semibold text-gray-700">
                  {item.label}
                </span>
                {item.done && (
                  <span
                    className="text-xs bg-green-100 text-green-700
                                   border border-green-300 rounded-full px-2 py-0.5"
                  >
                    완료 ✓
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-stardew-brown">
                  {item.current}
                </span>
                <span className="text-xs text-gray-400">
                  {" "}
                  / {item.required}
                </span>
              </div>
            </div>

            {/* 진행 바 */}
            <div
              className="w-full bg-gray-100 rounded-full h-4 overflow-hidden
                            border border-gray-200"
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${item.percent}%`,
                  backgroundColor: item.done ? "#5D9E4E" : "#5B8DD9",
                }}
              />
            </div>

            {/* 가중치 + 퍼센트 */}
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">
                가중치 {item.weight}%
              </span>
              <span className="text-xs font-semibold text-gray-600">
                {item.percent.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 안내 */}
      <p className="mt-6 text-xs text-gray-400 text-center">
        * 일부 항목(선적 목록, 요리, 장인 기술 등)은 세이브 파일 구조상 추후
        지원 예정
      </p>
    </div>
  );
}
