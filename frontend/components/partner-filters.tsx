"use client";

interface PartnerFiltersProps {
  analytics: boolean;
  location: boolean;
  adExchange: boolean;

  setAnalytics: (value: boolean) => void;
  setLocation:  (value: boolean) => void;
  setAdExchange:(value: boolean) => void;
}

const FILTERS = [
  {
    key: "analytics" as const,
    label: "Analytics SDK",
    icon: "📊",
    desc: "Usage metrics & behavioural events",
    color: "#FBBF24",
    risk: "+20",
  },
  {
    key: "location" as const,
    label: "Location Provider",
    icon: "📍",
    desc: "Geo-coordinate metadata attachment",
    color: "#34D399",
    risk: "+30",
  },
  {
    key: "adExchange" as const,
    label: "Ad Exchange",
    icon: "🎯",
    desc: "Real-time bidding & ad distribution",
    color: "#F87171",
    risk: "+30",
  },
];

export default function PartnerFilters({
  analytics,
  location,
  adExchange,
  setAnalytics,
  setLocation,
  setAdExchange,
}: PartnerFiltersProps) {
  const values = { analytics, location, adExchange };
  const setters = { analytics: setAnalytics, location: setLocation, adExchange: setAdExchange };
  const activeCount = [analytics, location, adExchange].filter(Boolean).length;

  return (
    <div className="glass-card rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#818CF8] animate-pulse-dot" />
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#818CF8]">
            Partner Filters
          </h3>
        </div>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(56,189,248,0.15)",
            border: "1px solid rgba(56,189,248,0.3)",
            color: "#38BDF8",
          }}
        >
          {activeCount} / {FILTERS.length} active
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Toggle partners to see how they affect the data chain and privacy risk score.
      </p>

      <div className="space-y-3">
        {FILTERS.map((filter) => {
          const isOn = values[filter.key];

          return (
            <div
              key={filter.key}
              className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200"
              style={{
                borderColor: isOn ? `${filter.color}30` : "rgba(31,41,55,0.6)",
                background: isOn
                  ? `${filter.color}08`
                  : "rgba(11,17,23,0.5)",
              }}
            >
              {/* Icon */}
              <span
                className="text-xl flex-shrink-0 transition-all duration-200"
                style={{ opacity: isOn ? 1 : 0.4 }}
              >
                {filter.icon}
              </span>

              {/* Label + desc */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-semibold transition-colors duration-200"
                    style={{ color: isOn ? filter.color : "#6b7280" }}
                  >
                    {filter.label}
                  </span>
                  {isOn && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded terminal-text"
                      style={{
                        background: `${filter.color}20`,
                        color: filter.color,
                        border: `1px solid ${filter.color}30`,
                      }}
                    >
                      {filter.risk} RISK
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5 truncate">
                  {filter.desc}
                </p>
              </div>

              {/* Toggle switch */}
              <label className="toggle-switch flex-shrink-0" id={`toggle-${filter.key}`}>
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={(e) => setters[filter.key](e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <p className="mt-3 text-[11px] text-slate-600 text-center">
        Changes update the chain visualization instantly
      </p>
    </div>
  );
}