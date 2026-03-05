import { useState } from "react";
import { useRadarChart } from "../hooks/useRadarChart";

const STATUS_LABEL = {
  Friendly: "친구",
  Dating: "연인 💕",
  Married: "배우자 💍",
  Divorced: "이혼",
};

const STATUS_COLOR = {
  Friendly: "#5B8DD9",
  Dating: "#E05C5C",
  Married: "#E8A838",
  Divorced: "#9B9B9B",
};

const RADAR_LIMIT = 8;
const RADAR_MIN = 3;

export default function FriendshipRadar({ friendship }) {
  const [tooltip, setTooltip] = useState(null);

  const top = friendship.slice(0, RADAR_LIMIT);
  const showRadar = top.length >= RADAR_MIN;

  const radarData = top.map((v) => ({
    ...v,
    label: v.name,
  }));

  const { axes, gridPolygons, dataPolygon, dataPoints, cx, cy } = useRadarChart(
    radarData,
    360,
    5,
  );

  const sortedAll = [...friendship];

  if (!friendship || friendship.length === 0) {
    return (
      <div className="bg-stardew-card border-2 border-stardew-brown rounded-2xl p-6 shadow-sm">
        <h2 className="text-stardew-brown font-bold text-lg mb-2">
          💛 주민 우정도
        </h2>
        <p className="text-center text-gray-400 py-12">
          우정도 데이터가 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="bg-stardew-card border-2 border-stardew-brown rounded-2xl p-6 shadow-sm">
      <h2 className="text-stardew-brown font-bold text-lg mb-1">
        💛 주민 우정도
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        레이더 차트는 하트 수 상위 {RADAR_LIMIT}명 기준
      </p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* 레이더 차트 */}
        <div className="flex-shrink-0 mx-auto">
          {showRadar ? (
            <svg width={360} height={360}>
              {/* 동심원 그리드 */}
              {gridPolygons.map((points, i) => (
                <polygon
                  key={i}
                  points={points}
                  fill="none"
                  stroke="#e5d9c3"
                  strokeWidth={1}
                />
              ))}

              {/* 축 선 */}
              {axes.map((axis) => (
                <line
                  key={axis.name}
                  x1={cx}
                  y1={cy}
                  x2={axis.x}
                  y2={axis.y}
                  stroke="#d5c9b3"
                  strokeWidth={1}
                />
              ))}

              {/* 데이터 폴리곤 */}
              <polygon
                points={dataPolygon}
                fill="rgba(91,141,217,0.25)"
                stroke="#5B8DD9"
                strokeWidth={2}
              />

              {/* 데이터 포인트 */}
              {dataPoints.map((pt) => (
                <circle
                  key={pt.name}
                  cx={pt.cx}
                  cy={pt.cy}
                  r={5}
                  fill={STATUS_COLOR[pt.status] ?? "#5B8DD9"}
                  stroke="white"
                  strokeWidth={1.5}
                  className="cursor-pointer"
                  onMouseEnter={() => setTooltip(pt)}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}

              {/* 축 라벨 */}
              {axes.map((axis) => (
                <text
                  key={axis.name}
                  x={axis.labelX}
                  y={axis.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill="#6b5a3e"
                >
                  {axis.label}
                </text>
              ))}

              {/* 툴팁 */}
              {tooltip && (
                <g>
                  <rect
                    x={tooltip.cx - 48}
                    y={tooltip.cy - 44}
                    width={96}
                    height={38}
                    rx={6}
                    fill="#fffbf0"
                    stroke="#8B6914"
                    strokeWidth={1.5}
                  />
                  <text
                    x={tooltip.cx}
                    y={tooltip.cy - 30}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight="bold"
                    fill="#4a3728"
                  >
                    {tooltip.name}
                  </text>
                  <text
                    x={tooltip.cx}
                    y={tooltip.cy - 15}
                    textAnchor="middle"
                    fontSize={10}
                    fill="#6b5a3e"
                  >
                    {tooltip.hearts} / {tooltip.max_hearts} ❤️
                    {"  "}
                    {STATUS_LABEL[tooltip.status] ?? tooltip.status}
                  </text>
                </g>
              )}
            </svg>
          ) : (
            <div
              className="w-[360px] h-[360px] flex flex-col items-center justify-center
                            text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl"
            >
              <span className="text-4xl mb-3">💛</span>
              <p className="text-sm font-semibold">우정도 데이터 부족</p>
              <p className="text-xs mt-1">
                레이더 차트는 3명 이상부터 표시됩니다
              </p>
            </div>
          )}
        </div>

        {/* 전체 주민 하트 목록 */}
        <div className="flex-1 w-full max-h-[360px] overflow-y-auto space-y-2 pr-1">
          {sortedAll.map(({ name, hearts, max_hearts, status }) => (
            <div key={name} className="flex items-center gap-2">
              <span className="w-20 text-xs text-gray-700 shrink-0">
                {name}
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: max_hearts }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-sm"
                    style={{
                      backgroundColor:
                        i < hearts
                          ? (STATUS_COLOR[status] ?? "#5B8DD9")
                          : "#e5d9c3",
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 ml-1">
                {STATUS_LABEL[status] ?? status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
