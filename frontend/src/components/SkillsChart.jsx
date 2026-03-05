import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const SKILL_COLORS = {
  농사: "#5D9E4E",
  낚시: "#5B8DD9",
  채집: "#E8A838",
  광업: "#9B7EC8",
  전투: "#E05C5C",
};

const SKILL_ICONS = {
  농사: "🌱",
  낚시: "🎣",
  채집: "#🍄",
  광업: "⛏️",
  전투: "⚔️",
};

export default function SkillsChart({ skills }) {
  const data = Object.entries(skills).map(([name, level]) => ({
    name,
    level,
    icon: SKILL_ICONS[name] ?? "⭐",
    fill: SKILL_COLORS[name] ?? "#8B6914",
  }));

  return (
    <div className="bg-stardew-card border-2 border-stardew-brown rounded-2xl p-6 shadow-sm">
      <h2 className="text-stardew-brown font-bold text-lg mb-4">
        🌟 스킬 레벨
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 16, right: 16, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5d9c3" />
          <XAxis dataKey="name" tick={{ fontSize: 13, fill: "#6b5a3e" }} />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fontSize: 12, fill: "#6b5a3e" }}
          />
          <Bar dataKey="level" radius={[6, 6, 0, 0]} maxBarSize={56}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="level"
              position="top"
              style={{ fontSize: 13, fontWeight: "bold", fill: "#4a3728" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* 하트 스타일 레벨 표시 */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {data.map(({ name, level, fill }) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <div className="flex gap-px flex-wrap justify-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: i < level ? fill : "#e5d9c3",
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">{level} / 10</span>
          </div>
        ))}
      </div>
    </div>
  );
}
