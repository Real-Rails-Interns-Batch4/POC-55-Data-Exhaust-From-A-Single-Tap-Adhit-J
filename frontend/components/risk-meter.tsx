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

  if (analytics) score += 20;
  if (location) score += 30;
  if (adExchange) score += 30;

  let level = "LOW";

  if (score >= 70) {
    level = "HIGH";
  } else if (score >= 40) {
    level = "MEDIUM";
  }

  return (
    <div>

      <div className="mb-2 flex justify-between">
        <span>Privacy Risk</span>
        <span>{level}</span>
      </div>

      <div className="h-3 w-full rounded bg-slate-800">

        <div
          className="
          h-3
          rounded
          bg-red-500
          transition-all
          "
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      <p className="mt-2 text-sm text-slate-400">
        Risk Score: {score}
      </p>

    </div>
  );
}