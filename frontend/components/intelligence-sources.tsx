import { IntelligenceSource } from "@/types/intelligence";

const MOCK_SOURCES: IntelligenceSource[] = [
    {
      name: "CFPB",
      full: "Consumer Financial Protection Bureau",
      desc: "Consumer complaint and demand intelligence. Reveals patterns in financial product distribution and consumer harm.",
      color: "#34D399",
      bg: "rgba(52,211,153,0.08)",
      border: "rgba(52,211,153,0.2)",
      icon: "🏛",
      status: "LIVE",
      summary: "Mock fallback until the live CFPB payload is available.",
    },
    {
      name: "GDELT",
      full: "Global Database of Events, Language & Tone",
      desc: "Global events and influence monitoring. Tracks media sentiment across data-economy topics in real time.",
      color: "#38BDF8",
      bg: "rgba(56,189,248,0.08)",
      border: "rgba(56,189,248,0.2)",
      icon: "🌐",
      status: "LIVE",
      summary: "Mock fallback until the live GDELT payload is available.",
    },
    {
      name: "Synthetic",
      full: "Synthetic Event Feed",
      desc: "Demonstration sequence of SDK, location, ad-network and partner interactions based on real-world behavioral patterns.",
      color: "#FBBF24",
      bg: "rgba(251,191,36,0.08)",
      border: "rgba(251,191,36,0.2)",
      icon: "⚗",
      status: "MOCK",
      summary: "Demonstration feed used when live services are unavailable.",
    },
  ];

interface IntelligenceSourcesProps {
  sources?: IntelligenceSource[];
}

export default function IntelligenceSources({ sources = MOCK_SOURCES }: IntelligenceSourcesProps) {

  return (
    <div className="glass-card rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse-dot" />
        <h3 className="text-xs font-semibold tracking-widest uppercase text-[#38BDF8]">
          Intelligence Sources
        </h3>
      </div>

      {sources.map((src) => (
        <div
          key={src.name}
          className="rounded-xl p-3 border transition-all duration-200 hover-glow"
          style={{
            background: src.bg,
            borderColor: src.border,
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{src.icon}</span>
              <div>
                <div
                  className="text-sm font-bold leading-tight"
                  style={{ color: src.color }}
                >
                  {src.name}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  {src.full}
                </div>
              </div>
            </div>

            {/* Status badge */}
            <span
              className="flex items-center gap-1 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                color: src.status === "MOCK" ? "#FBBF24" : src.color,
                background: src.status === "MOCK"
                  ? "rgba(251,191,36,0.15)"
                  : `${src.bg}`,
                border: `1px solid ${src.border}`,
              }}
            >
              {src.status !== "MOCK" && (
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse-dot inline-block"
                  style={{ background: src.color }}
                />
              )}
              {src.status}
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            {src.desc}
          </p>

          <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
            {src.summary}
          </p>
        </div>
      ))}
    </div>
  );
}