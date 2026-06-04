"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { EmittedField } from "@/types/emitted-field";

// Sensitivity classification per field name
const SENSITIVITY: Record<string, "LOW" | "MED" | "HIGH"> = {
  "Device ID":    "HIGH",
  "Session ID":   "MED",
  "Timestamp":    "LOW",
  "App Version":  "LOW",
  "Location":     "HIGH",
  "Network Type": "MED",
};

const FIELD_ICONS: Record<string, string> = {
  "Device ID":    "🔑",
  "Session ID":   "🔗",
  "Timestamp":    "🕐",
  "App Version":  "📦",
  "Location":     "📍",
  "Network Type": "📡",
};

function SensitivityBadge({ level }: { level: "LOW" | "MED" | "HIGH" }) {
  if (level === "HIGH") return <span className="badge-risk-high">HIGH</span>;
  if (level === "MED")  return <span className="badge-risk-med">MED</span>;
  return <span className="badge-risk-low">LOW</span>;
}

const MOCK_FIELDS: EmittedField[] = [
  { field: "Device ID",    value: "A1B2C3D4" },
  { field: "Session ID",   value: "S-7821"   },
  { field: "Timestamp",    value: "12:01:01" },
  { field: "App Version",  value: "1.0.0"    },
  { field: "Location",     value: "Enabled"  },
  { field: "Network Type", value: "WiFi"     },
];

export default function EmittedFieldsTable() {
  const [fields, setFields] = useState<EmittedField[]>(MOCK_FIELDS);

  useEffect(() => {
    api
      .get("/api/emitted-fields")
      .then((res) => { setFields(res.data); })
      .catch(() => { /* keeps mock data */ });
  }, []);

  const highCount  = fields.filter(f => SENSITIVITY[f.field] === "HIGH").length;
  const medCount   = fields.filter(f => SENSITIVITY[f.field] === "MED").length;
  const lowCount   = fields.filter(f => SENSITIVITY[f.field] === "LOW").length;

  return (
    <div>
      {/* Sensitivity summary pills */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F87171]/10 border border-[#F87171]/20">
          <span className="w-2 h-2 rounded-full bg-[#F87171]" />
          <span className="text-xs font-semibold text-[#F87171]">{highCount} HIGH</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FBBF24]/10 border border-[#FBBF24]/20">
          <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
          <span className="text-xs font-semibold text-[#FBBF24]">{medCount} MED</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#34D399]/10 border border-[#34D399]/20">
          <span className="w-2 h-2 rounded-full bg-[#34D399]" />
          <span className="text-xs font-semibold text-[#34D399]">{lowCount} LOW</span>
        </div>
        <span className="ml-auto text-xs text-slate-500 terminal-text">
          {fields.length} FIELDS TOTAL
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#1F2937]">
        <table className="w-full">
          <thead>
            <tr
              className="border-b border-[#1F2937]"
              style={{ background: "rgba(7,16,26,0.8)" }}
            >
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-slate-500">
                Field
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-slate-500">
                Value
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-slate-500">
                Sensitivity
              </th>
            </tr>
          </thead>

          <tbody>
            {fields.map((item, index) => {
              const sensitivity = SENSITIVITY[item.field] ?? "LOW";
              const icon = FIELD_ICONS[item.field] ?? "📄";
              const isHigh = sensitivity === "HIGH";

              return (
                <tr
                  key={index}
                  className="
                    border-b border-[#1F2937]/60 transition-all duration-200
                    hover:bg-[#38BDF8]/5 group
                    animate-fade-in-up
                  "
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animationFillMode: "forwards",
                    opacity: 0,
                    background: isHigh
                      ? "rgba(248,113,113,0.02)"
                      : "transparent",
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{icon}</span>
                      <span className="text-sm font-medium text-slate-200">
                        {item.field}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className="terminal-text text-[#38BDF8]"
                      style={{
                        textShadow: "0 0 8px rgba(56,189,248,0.3)",
                      }}
                    >
                      {item.value}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <SensitivityBadge level={sensitivity} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <p className="mt-3 text-xs text-slate-600 leading-relaxed">
        ⚠ HIGH-sensitivity fields can be used for cross-app fingerprinting and identity resolution across advertising networks.
      </p>
    </div>
  );
}