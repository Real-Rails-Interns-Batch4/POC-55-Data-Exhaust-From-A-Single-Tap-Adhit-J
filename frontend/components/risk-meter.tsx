"use client";

interface RiskMeterProps {
  analytics: boolean;
  location: boolean;
  adExchange: boolean;
}

export default function RiskMeter({
  analytics,
  location,
  adExchange,
}: RiskMeterProps) {
  let score = 20;
  if (analytics)  score += 20;
  if (location)   score += 30;
  if (adExchange) score += 30;

  let level: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  let levelColor = "#34D399";
  let levelBg = "rgba(52,211,153,0.15)";
  let levelBorder = "rgba(52,211,153,0.3)";

  if (score >= 70) {
    level = "HIGH";
    levelColor = "#F87171";
    levelBg = "rgba(248,113,113,0.15)";
    levelBorder = "rgba(248,113,113,0.3)";
  } else if (score >= 40) {
    level = "MEDIUM";
    levelColor = "#FBBF24";
    levelBg = "rgba(251,191,36,0.15)";
    levelBorder = "rgba(251,191,36,0.3)";
  }

  // Gradient stops based on score
  const barGradient = score >= 70
    ? "linear-gradient(90deg, #34D399 0%, #FBBF24 40%, #F87171 100%)"
    : score >= 40
      ? "linear-gradient(90deg, #34D399 0%, #FBBF24 100%)"
      : "linear-gradient(90deg, #34D399 0%, #34D399 100%)";

  const contributors = [
    { label: "Mobile App (base)", value: 20, color: "#818CF8", active: true },
    { label: "Analytics SDK",     value: 20, color: "#FBBF24", active: analytics },
    { label: "Location Provider", value: 30, color: "#34D399", active: location },
    { label: "Ad Exchange",       value: 30, color: "#F87171", active: adExchange },
  ];

  return (
    <div className="space-y-4">
      {/* Score header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">
            Privacy Risk Score
          </p>
          <div className="flex items-end gap-2">
            <span
              className="text-4xl font-black tabular-nums"
              style={{ color: levelColor, textShadow: `0 0 20px ${levelColor}60` }}
            >
              {score}
            </span>
            <span className="text-slate-500 text-sm mb-1">/100</span>
          </div>
        </div>

        <div
          className="px-4 py-2 rounded-xl border text-center"
          style={{
            background: levelBg,
            borderColor: levelBorder,
            boxShadow: `0 0 16px ${levelColor}20`,
          }}
        >
          <p className="text-xs text-slate-400 mb-0.5">Risk Level</p>
          <p
            className="text-lg font-black tracking-wider"
            style={{ color: levelColor }}
          >
            {level}
          </p>
        </div>
      </div>

      {/* Main progress bar */}
      <div className="relative">
        <div className="h-3 w-full rounded-full bg-[#0B1117] border border-[#1F2937] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${score}%`,
              background: barGradient,
              boxShadow: `0 0 12px ${levelColor}60`,
            }}
          />
        </div>

        {/* Tick marks at 40 and 70 */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/20"
          style={{ left: "40%" }}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-white/20"
          style={{ left: "70%" }}
        />

        {/* Labels */}
        <div className="flex justify-between mt-1 text-[10px] text-slate-600 terminal-text">
          <span>0</span>
          <span style={{ marginLeft: "35%" }}>LOW</span>
          <span>MED</span>
          <span>HIGH</span>
          <span>100</span>
        </div>
      </div>

      {/* Risk contributors breakdown */}
      <div className="space-y-2 pt-1">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
          Contributors
        </p>
        {contributors.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: item.active ? item.color : "#374151",
                boxShadow: item.active ? `0 0 6px ${item.color}80` : "none",
              }}
            />
            <div className="flex-1 flex items-center justify-between">
              <span
                className="text-xs"
                style={{ color: item.active ? "#cbd5e1" : "#4b5563" }}
              >
                {item.label}
              </span>
              <span
                className="terminal-text text-xs font-semibold"
                style={{ color: item.active ? item.color : "#374151" }}
              >
                +{item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}