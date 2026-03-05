export default function CircularProgress({ percent, size = 140 }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const getColor = (p) => {
    if (p >= 100) return "#F5D76E";
    if (p >= 75) return "#5D9E4E";
    if (p >= 50) return "#5B8DD9";
    if (p >= 25) return "#E8A838";
    return "#E05C5C";
  };

  const color = getColor(percent);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* 배경 트랙 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5d9c3"
          strokeWidth={strokeWidth}
        />
        {/* 진행 바 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      {/* 중앙 텍스트 */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {percent.toFixed(1)}
        </span>
        <span className="text-xs text-gray-400">%</span>
      </div>
    </div>
  );
}
