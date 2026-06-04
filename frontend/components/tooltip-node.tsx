"use client";

import { Handle, Position } from "reactflow";
import { Tooltip } from "react-tooltip";
import { nodeTooltips } from "@/lib/node-tooltips";

interface NodeColor {
  border: string;
  bg: string;
  glow: string;
  text: string;
}

interface TooltipNodeProps {
  data: {
    label: string;
    sublabel?: string;
    icon?: string;
    color?: NodeColor;
  };
}

export default function TooltipNode({ data }: TooltipNodeProps) {
  const tooltipText =
    nodeTooltips[data.label] ?? "No description available";

  const color = data.color ?? {
    border: "#38BDF8",
    bg: "rgba(56,189,248,0.08)",
    glow: "rgba(56,189,248,0.25)",
    text: "#38BDF8",
  };

  const nodeId = `tooltip-${data.label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: color.border,
          border: "none",
          width: 8,
          height: 8,
          boxShadow: `0 0 6px ${color.glow}`,
        }}
      />

      <div
        data-tooltip-id={nodeId}
        data-tooltip-content={tooltipText}
        className="px-4 py-3 cursor-pointer group transition-all duration-200"
        style={{
          minWidth: 160,
        }}
      >
        {/* Icon + label row */}
        <div className="flex items-center gap-2">
          {data.icon && (
            <span className="text-lg leading-none">{data.icon}</span>
          )}
          <div>
            <p
              className="text-sm font-semibold leading-tight"
              style={{ color: color.text }}
            >
              {data.label}
            </p>
            {data.sublabel && (
              <p className="text-[10px] text-slate-500 mt-0.5 tracking-wide uppercase">
                {data.sublabel}
              </p>
            )}
          </div>
        </div>

        {/* Active pulse bar at bottom */}
        <div
          className="mt-2 h-[2px] rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color.border}, transparent)`,
            opacity: 0.6,
          }}
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: color.border,
          border: "none",
          width: 8,
          height: 8,
          boxShadow: `0 0 6px ${color.glow}`,
        }}
      />

      <Tooltip
        id={nodeId}
        style={{
          background: "#07101A",
          border: "1px solid #1F2937",
          borderRadius: "10px",
          color: "#e2e8f0",
          fontSize: "12px",
          maxWidth: "220px",
          padding: "8px 12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      />
    </>
  );
}