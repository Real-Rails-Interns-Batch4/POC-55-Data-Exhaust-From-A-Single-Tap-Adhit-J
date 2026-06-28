"use client";

import { useMemo } from "react";

import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Edge,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";
import TooltipNode from "./tooltip-node";

const nodeTypes = {
  tooltipNode: TooltipNode,
};

interface PartnerChainProps {
  analytics: boolean;
  location: boolean;
  adExchange: boolean;
}

// Color scheme per node role
const NODE_COLORS = {
  user:     { border: "#38BDF8", bg: "rgba(56,189,248,0.08)",  glow: "rgba(56,189,248,0.25)",  text: "#38BDF8"  },
  app:      { border: "#818CF8", bg: "rgba(129,140,248,0.08)", glow: "rgba(129,140,248,0.25)", text: "#818CF8"  },
  sdk:      { border: "#FBBF24", bg: "rgba(251,191,36,0.08)",  glow: "rgba(251,191,36,0.25)",  text: "#FBBF24"  },
  location: { border: "#34D399", bg: "rgba(52,211,153,0.08)",  glow: "rgba(52,211,153,0.25)",  text: "#34D399"  },
  ad:       { border: "#F87171", bg: "rgba(248,113,113,0.08)", glow: "rgba(248,113,113,0.25)", text: "#F87171"  },
  partner:  { border: "#818CF8", bg: "rgba(129,140,248,0.08)", glow: "rgba(129,140,248,0.25)", text: "#818CF8"  },
};

function makeNode(
  id: string,
  x: number,
  y: number,
  label: string,
  sublabel: string,
  icon: string,
  colorKey: keyof typeof NODE_COLORS
): Node {
  const c = NODE_COLORS[colorKey];
  return {
    id,
    position: { x, y },
    type: "tooltipNode",
    data: { label, sublabel, icon, color: c },
    style: {
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "14px",
      padding: "0",
      boxShadow: `0 0 18px ${c.glow}, 0 4px 12px rgba(0,0,0,0.5)`,
      width: 160,
    },
  };
}

function makeEdge(
  id: string,
  source: string,
  target: string,
  color: string
): Edge {
  return {
    id,
    source,
    target,
    animated: true,
    style: {
      stroke: color,
      strokeWidth: 2,
      filter: `drop-shadow(0 0 4px ${color})`,
    },
  };
}

export default function PartnerChain({
  analytics,
  location,
  adExchange,
}: PartnerChainProps) {

  const nodes = useMemo(() => {
    const result: Node[] = [];

    // Always-present nodes
    result.push(makeNode("1", 300, 20,  "User Tap",    "Initiates event",       "👆", "user"));
    result.push(makeNode("2", 300, 140, "Mobile App",  "Event processor",       "📱", "app"));

    // Conditional middle-tier
    const yPos = 260;
    if (analytics) {
      result.push(makeNode("3", 80, yPos, "Analytics SDK", "Usage metrics", "📊", "sdk"));
    }
    if (location) {
      result.push(makeNode("4", 300, yPos, "Location Provider", "Geo metadata", "📍", "location"));
    }
    if (adExchange) {
      result.push(makeNode("5", 520, yPos, "Ad Exchange", "RTB requests", "🎯", "ad"));
    }

    result.push(makeNode("6", 300, 400, "Data Partner", "Final recipient", "🏢", "partner"));

    return result;
  }, [analytics, location, adExchange]);

  const edges = useMemo(() => {
    const result: Edge[] = [];
    const visibleIds = nodes.map((n) => n.id);

    // Always: 1→2
    result.push(makeEdge("e1-2", "1", "2", "#38BDF8"));

    // 2 → each middle-tier node
    if (visibleIds.includes("3")) result.push(makeEdge("e2-3", "2", "3", "#FBBF24"));
    if (visibleIds.includes("4")) result.push(makeEdge("e2-4", "2", "4", "#34D399"));
    if (visibleIds.includes("5")) result.push(makeEdge("e2-5", "2", "5", "#F87171"));

    // middle-tier → 6
    if (visibleIds.includes("3")) result.push(makeEdge("e3-6", "3", "6", "#FBBF24"));
    if (visibleIds.includes("4")) result.push(makeEdge("e4-6", "4", "6", "#34D399"));
    if (visibleIds.includes("5")) result.push(makeEdge("e5-6", "5", "6", "#F87171"));

    // Direct 2→6 if all disabled
    if (!visibleIds.includes("3") && !visibleIds.includes("4") && !visibleIds.includes("5")) {
      result.push(makeEdge("e2-6", "2", "6", "#818CF8"));
    }

    return result;
  }, [nodes]);

  return (
    <div className="h-[520px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        attributionPosition="bottom-right"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="rgba(56,189,248,0.08)"
        />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(n) => {
            const c = n.data?.color;
            return c ? c.border : "#38BDF8";
          }}
          maskColor="rgba(3,7,18,0.85)"
          style={{ background: "#07101A", border: "1px solid #1F2937" }}
        />
      </ReactFlow>
    </div>
  );
}