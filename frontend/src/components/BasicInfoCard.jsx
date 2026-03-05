export default function BasicInfoCard({ data }) {
  const {
    player_name,
    farm_name,
    money,
    year,
    season,
    day,
    farm_type,
    hours_played,
  } = data;

  const rows = [
    { label: "👤 플레이어", value: player_name },
    { label: "🏡 농장 이름", value: `${farm_name} 농장` },
    { label: "💰 현재 자금", value: `${money.toLocaleString()}G` },
    { label: "📅 날짜", value: `${year}년 ${season} ${day}일` },
    { label: "🌾 농장 종류", value: farm_type },
    { label: "⏱ 플레이 시간", value: `약 ${hours_played}시간` },
  ];

  return (
    <div className="bg-stardew-card border-2 border-stardew-brown rounded-2xl p-6 shadow-sm">
      <h2 className="text-stardew-brown font-bold text-lg mb-4">
        🧑‍🌾 농장 기본 정보
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex flex-col">
            <span className="text-xs text-gray-500">{label}</span>
            <span className="font-semibold text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
