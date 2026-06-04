"use client";

import { useEffect, useState } from "react";
import IntelligenceSources from "./intelligence-sources";
import { api } from "@/lib/api";
import { IntelligenceData } from "@/types/intelligence";
import DownloadData from "./download-data";
import RiskMeter from "./risk-meter";

interface SidebarProps {
  analytics: boolean;
  location:  boolean;
  adExchange:boolean;
}

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{value}</>;
}

const MOCK_INTELLIGENCE: IntelligenceData = {
  title: "Data Exhaust from a Single Tap",
  metric: { partnersTouched: 5 },
  whyThisMatters: "A single tap can trigger multiple downstream data-sharing events across SDKs, ad networks, and analytics providers. Most users have no visibility into this cascade.",
  whoControls: "Mobile platforms, analytics SDK providers, ad networks and data brokers influence how interaction data moves across the ecosystem — largely without explicit user consent.",
  privacyImplications: [
    "Location exposure through third-party SDKs",
    "Device fingerprinting across advertising networks",
    "Behavioral profiling based on interaction patterns",
  ],
  mitigationTips: [
    "Limit location permissions to 'while using app'",
    "Disable ad personalization in device settings",
    "Review third-party app permissions regularly",
    "Use privacy-focused alternatives when possible",
  ],
};

export default function Sidebar({ analytics, location, adExchange }: SidebarProps) {
  const [data, setData] = useState<IntelligenceData | null>(null);

  useEffect(() => {
    api
      .get("/api/intelligence")
      .then((res) => setData(res.data))
      .catch(() => setData(MOCK_INTELLIGENCE));
  }, []);

  const sources = data?.sources;

  if (!data) {
    return (
      <div className="flex flex-col gap-4 p-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 rounded-2xl border border-[#1F2937] animate-pulse"
            style={{ background: "rgba(11,17,23,0.5)" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      {/* ── Section A: Intelligence Sources ── */}
      <IntelligenceSources sources={sources} />

      {/* ── Section A: Key Metrics ── */}
      <div className="glass-card rounded-2xl p-4 animate-fade-in-up opacity-0 delay-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse-dot" />
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#38BDF8]">
            Live Metrics
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-xl p-3 border"
            style={{
              background: "rgba(56,189,248,0.06)",
              borderColor: "rgba(56,189,248,0.15)",
            }}
          >
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
              Partners Touched
            </p>
            <p className="text-3xl font-black text-[#38BDF8] tabular-nums"
               style={{ textShadow: "0 0 20px rgba(56,189,248,0.5)" }}>
              <CountUp target={5} />
            </p>
          </div>

          <div
            className="rounded-xl p-3 border"
            style={{
              background: "rgba(129,140,248,0.06)",
              borderColor: "rgba(129,140,248,0.15)",
            }}
          >
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
              Signals Emitted
            </p>
            <p className="text-3xl font-black text-[#818CF8] tabular-nums"
               style={{ textShadow: "0 0 20px rgba(129,140,248,0.5)" }}>
              <CountUp target={6} />
            </p>
          </div>

          <div
            className="col-span-2 rounded-xl p-3 border"
            style={{
              background: "rgba(248,113,113,0.06)",
              borderColor: "rgba(248,113,113,0.15)",
            }}
          >
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
              Avg. Data Hops
            </p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-black text-[#F87171] tabular-nums"
                 style={{ textShadow: "0 0 20px rgba(248,113,113,0.5)" }}>
                <CountUp target={3} />
              </p>
              <p className="text-xs text-slate-500 mb-1">per tap event</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ── Risk Assessment ── */}
      <div className="glass-card rounded-2xl p-4 animate-fade-in-up opacity-0 delay-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F87171] animate-pulse-dot" />
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#F87171]">
            Risk Assessment
          </h3>
        </div>
        <RiskMeter
          analytics={analytics}
          location={location}
          adExchange={adExchange}
        />
      </div>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ── Section B: Why This Matters ── */}
      <div className="glass-card rounded-2xl p-4 animate-fade-in-up opacity-0 delay-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">💡</span>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#FBBF24]">
            Why This Matters
          </h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {data.whyThisMatters}
        </p>
      </div>

      {/* ── Section C: Who Controls the Rail ── */}
      <div className="glass-card rounded-2xl p-4 animate-fade-in-up opacity-0 delay-400">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🏗</span>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#818CF8]">
            Who Controls the Rail
          </h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {data.whoControls}
        </p>
      </div>

      {/* ── Privacy Implications ── */}
      <div className="glass-card rounded-2xl p-4 animate-fade-in-up opacity-0 delay-500">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">⚠</span>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#F87171]">
            Privacy Implications
          </h3>
        </div>
        <ul className="space-y-2">
          {data.privacyImplications.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-slate-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${500 + index * 100}ms`, animationFillMode: "forwards" }}
            >
              <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#F87171]/20 border border-[#F87171]/30 flex items-center justify-center text-[#F87171] text-[10px]">
                !
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Mitigation Tips ── */}
      <div className="glass-card rounded-2xl p-4 animate-fade-in-up opacity-0 delay-600">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🛡</span>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#34D399]">
            Mitigation Tips
          </h3>
        </div>
        <ul className="space-y-2">
          {data.mitigationTips.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-slate-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: "forwards" }}
            >
              <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#34D399]/20 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] text-[10px]">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Section E: Download ── */}
      <div className="animate-fade-in-up opacity-0 delay-700">
        <DownloadData />
      </div>

    </div>
  );
}