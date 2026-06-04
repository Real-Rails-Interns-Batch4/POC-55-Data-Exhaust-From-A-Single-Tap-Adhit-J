"use client";

import { api } from "@/lib/api";
import { MOCK_EVENTS } from "./event-replay";

export default function DownloadData() {
  const downloadFile = async () => {
    let data;
    try {
      const response = await api.get("/api/replay");
      data = response.data;
    } catch (error) {
      // Fallback to mock data if backend is offline
      data = MOCK_EVENTS;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url  = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "event_sequence.json";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      id="download-sample-data-btn"
      onClick={downloadFile}
      className="
        group relative w-full overflow-hidden rounded-xl
        px-4 py-3.5
        text-sm font-semibold tracking-wide
        text-white
        transition-all duration-300
        border border-[#38BDF8]/30
        hover:border-[#38BDF8]/60
      "
      style={{
        background: "linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(129,140,248,0.1) 100%)",
        boxShadow: "0 0 0 0 rgba(56,189,248,0)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 20px rgba(56,189,248,0.2), 0 0 0 1px rgba(56,189,248,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 0 0 rgba(56,189,248,0)";
      }}
    >
      {/* Shimmer overlay */}
      <div
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
        "
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.08) 50%, transparent 100%)",
        }}
      />

      <div className="relative flex items-center justify-center gap-2.5">
        <span className="text-lg group-hover:animate-float">⬇</span>
        <span>Download Sample Data</span>
        <span className="terminal-text text-[10px] text-[#38BDF8]/60 ml-1">
          JSON
        </span>
      </div>
    </button>
  );
}