import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const BUILDING_COLORS = [
  "#5D9E4E",
  "#5B8DD9",
  "#E8A838",
  "#9B7EC8",
  "#E05C5C",
  "#4ECDC4",
  "#F7DC6F",
  "#AF7AC5",
];

const ANIMAL_ICONS = {
  Cow: "🐄",
  Chicken: "🐔",
  Pig: "🐷",
  Sheep: "🐑",
  Goat: "🐐",
  Duck: "🦆",
  Rabbit: "🐰",
  Dinosaur: "🦕",
};

export default function FarmStatusCard({ data }) {
  const {
    building_count,
    building_types,
    animal_count,
    animal_types,
    crop_count,
    object_count,
  } = data;

  // 건물 파이 차트 데이터
  const buildingData = Object.entries(building_types).map(([name, count]) => ({
    name,
    value: count,
  }));

  // 동물 목록
  const animalList = Object.entries(animal_types).map(([type, count]) => ({
    type,
    count,
    icon: ANIMAL_ICONS[type] ?? "🐾",
  }));

  const stats = [
    { label: "🏠 건물", value: `${building_count}개` },
    { label: "🐾 동물", value: `${animal_count}마리` },
    { label: "🌽 작물", value: `${crop_count}개` },
    { label: "📦 오브젝트", value: `${object_count}개` },
  ];

  return (
    <div className="bg-stardew-card border-2 border-stardew-brown rounded-2xl p-6 shadow-sm">
      <h2 className="text-stardew-brown font-bold text-lg mb-4">
        🏡 농장 현황
      </h2>

      {/* 요약 통계 */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center"
          >
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="font-bold text-stardew-brown text-lg">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 건물 파이 차트 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            건물 종류
          </h3>
          {buildingData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={buildingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {buildingData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={BUILDING_COLORS[i % BUILDING_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}개`, name]} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: 12 }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[180px] flex items-center justify-center text-gray-400 text-sm">
              건물 없음
            </div>
          )}
        </div>

        {/* 동물 목록 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            동물 현황
          </h3>
          {animalList.length > 0 ? (
            <div className="space-y-2">
              {animalList.map(({ type, count, icon }) => (
                <div
                  key={type}
                  className="flex items-center justify-between bg-yellow-50
                             border border-yellow-200 rounded-lg px-3 py-2"
                >
                  <span className="text-sm">
                    {icon} {type}
                  </span>
                  <span className="font-bold text-stardew-brown text-sm">
                    {count}마리
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              동물 없음
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
