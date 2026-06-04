"use client";

import { Tooltip } from "react-tooltip";
import { nodeTooltips } from "@/lib/node-tooltips";

import {
  Handle,
  Position,
} from "reactflow";

export default function TooltipNode({
  data,
}: any) {

  const tooltipText =
    nodeTooltips[data.label] ??
    "No description available";

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
      />

      <div
        data-tooltip-id="partner-tooltip"
        data-tooltip-content={tooltipText}
        className="
          rounded-xl
          border
          border-cyan-400
          bg-[#0B1117]
          px-4
          py-2
          text-white
          shadow-[0_0_12px_rgba(56,189,248,0.15)]
        "
      >
        {data.label}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
      />

      <Tooltip id="partner-tooltip" />
    </>
  );
}