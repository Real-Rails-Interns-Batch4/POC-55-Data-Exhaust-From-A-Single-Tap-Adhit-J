"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { IntelligenceData } from "@/types/intelligence";

export default function Sidebar() {
  const [data, setData] =
    useState<IntelligenceData | null>(null);

  useEffect(() => {
    api
      .get("/api/intelligence")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-[#1F2937] bg-[#0B1117] p-4">
        <h3 className="text-sm text-slate-400">
          Partners Touched
        </h3>

        <p className="text-3xl font-bold text-cyan-400">
          {data.metric.partnersTouched}
        </p>
      </div>

      <div className="rounded-xl border border-[#1F2937] bg-[#0B1117] p-4">
        <h3 className="mb-2 font-semibold">
          Why This Matters
        </h3>

        <p className="text-sm text-slate-300">
          {data.whyThisMatters}
        </p>
      </div>

      <div className="rounded-xl border border-[#1F2937] bg-[#0B1117] p-4">
        <h3 className="mb-2 font-semibold">
          Who Controls The Rail
        </h3>

        <p className="text-sm text-slate-300">
          {data.whoControls}
        </p>
      </div>

      <div className="rounded-xl border border-[#1F2937] bg-[#0B1117] p-4">
        <h3 className="mb-3 font-semibold text-red-400">
          Privacy Implications
        </h3>

        <ul className="space-y-2">
          {data.privacyImplications.map((item, index) => (
            <li
              key={index}
              className="text-sm text-slate-300"
            >
              ⚠ {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-[#1F2937] bg-[#0B1117] p-4">
        <h3 className="mb-3 font-semibold text-green-400">
          Mitigation Tips
        </h3>

        <ul className="space-y-2">
          {data.mitigationTips.map((item, index) => (
            <li
              key={index}
              className="text-sm text-slate-300"
            >
              ✓ {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}