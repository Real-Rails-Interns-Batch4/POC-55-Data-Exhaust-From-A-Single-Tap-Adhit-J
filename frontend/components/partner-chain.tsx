"use client";

import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";

const nodes: Node[] = [
  {
    id: "1",
    position: { x: 250, y: 0 },
    data: { label: "User Tap" },
    style: {
      background: "#0B1117",
      color: "#ffffff",
      border: "1px solid #38BDF8",
      borderRadius: "12px",
      padding: "8px",
      boxShadow: "0 0 12px rgba(56,189,248,0.15)",
    },
  },

  {
    id: "2",
    position: { x: 250, y: 100 },
    data: { label: "Mobile App" },
    style: {
      background: "#0B1117",
      color: "#ffffff",
      border: "1px solid #38BDF8",
      borderRadius: "12px",
      padding: "8px",
      boxShadow: "0 0 12px rgba(56,189,248,0.15)",
    },
  },

  {
    id: "3",
    position: { x: 250, y: 200 },
    data: { label: "Analytics SDK" },
    style: {
      background: "#0B1117",
      color: "#ffffff",
      border: "1px solid #38BDF8",
      borderRadius: "12px",
      padding: "8px",
      boxShadow: "0 0 12px rgba(56,189,248,0.15)",
    },
  },

  {
    id: "4",
    position: { x: 250, y: 300 },
    data: { label: "Location Provider" },
    style: {
      background: "#0B1117",
      color: "#ffffff",
      border: "1px solid #38BDF8",
      borderRadius: "12px",
      padding: "8px",
      boxShadow: "0 0 12px rgba(56,189,248,0.15)",
    },
  },

  {
    id: "5",
    position: { x: 250, y: 400 },
    data: { label: "Ad Exchange" },
    style: {
      background: "#0B1117",
      color: "#ffffff",
      border: "1px solid #38BDF8",
      borderRadius: "12px",
      padding: "8px",
      boxShadow: "0 0 12px rgba(56,189,248,0.15)",
    },
  },

  {
    id: "6",
    position: { x: 250, y: 500 },
    data: { label: "Data Partner" },
    style: {
      background: "#0B1117",
      color: "#ffffff",
      border: "1px solid #38BDF8",
      borderRadius: "12px",
      padding: "8px",
      boxShadow: "0 0 12px rgba(56,189,248,0.15)",
    },
  },
];

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

export default function PartnerChain() {
  return (
    <div className="h-[650px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}