"use client";

import { useMemo } from "react";

import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";
import TooltipNode from "./tooltip-node";

const nodeTypes = {
  tooltipNode: TooltipNode,
};

const edges: Edge[] = [
  {
    id: "e1",
    source: "1",
    target: "2",
    animated: true,
    style: {
      stroke: "#38BDF8",
      strokeWidth: 2,
    },
  },
  {
    id: "e2",
    source: "2",
    target: "3",
    animated: true,
    style: {
      stroke: "#38BDF8",
      strokeWidth: 2,
    },
  },
  {
    id: "e3",
    source: "3",
    target: "4",
    animated: true,
    style: {
      stroke: "#38BDF8",
      strokeWidth: 2,
    },
  },
  {
    id: "e4",
    source: "4",
    target: "5",
    animated: true,
    style: {
      stroke: "#38BDF8",
      strokeWidth: 2,
    },
  },
  {
    id: "e5",
    source: "5",
    target: "6",
    animated: true,
    style: {
      stroke: "#38BDF8",
      strokeWidth: 2,
    },
  },
];

interface PartnerChainProps {
  analytics: boolean;
  location: boolean;
  adExchange: boolean;
}

export default function PartnerChain({
  analytics,
  location,
  adExchange,
}: PartnerChainProps) {
  const nodes = useMemo(() => {
    const result: Node[] = [];

    const nodeStyle = {
      background: "#0B1117",
      color: "#ffffff",
      border: "1px solid #38BDF8",
      borderRadius: "12px",
      padding: "8px",
      boxShadow: "0 0 12px rgba(56,189,248,0.15)",
    };

    result.push({
      id: "1",
      position: { x: 250, y: 0 },
      data: { label: "User Tap" },
      type: "tooltipNode",
      style: nodeStyle,
    });

    result.push({
      id: "2",
      position: { x: 250, y: 100 },
      data: { label: "Mobile App" },
      type: "tooltipNode",
      style: nodeStyle,
    });

    if (analytics) {
      result.push({
        id: "3",
        position: { x: 250, y: 200 },
        data: { label: "Analytics SDK" },
        type: "tooltipNode",
        style: nodeStyle,
      });
    }

    if (location) {
      result.push({
        id: "4",
        position: { x: 250, y: 300 },
        data: { label: "Location Provider" },
        type: "tooltipNode",
        style: nodeStyle,
      });
    }

    if (adExchange) {
      result.push({
        id: "5",
        position: { x: 250, y: 400 },
        data: { label: "Ad Exchange" },
        type: "tooltipNode",
        style: nodeStyle,
      });
    }

    result.push({
      id: "6",
      position: { x: 250, y: 500 },
      data: { label: "Data Partner" },
      type: "tooltipNode",
      style: nodeStyle,
    });

    return result;
  }, [analytics, location, adExchange]);

  return (
    <div className="h-[650px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}