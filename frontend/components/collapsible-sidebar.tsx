"use client";

import { useState } from "react";

import Sidebar from "./sidebar";
import PartnerFilters from "./partner-filters";

interface Props {
  analytics:    boolean;
  location:     boolean;
  adExchange:   boolean;
  setAnalytics: (value: boolean) => void;
  setLocation:  (value: boolean) => void;
  setAdExchange:(value: boolean) => void;
}

export default function CollapsibleSidebar({
  analytics,
  location,
  adExchange,
  setAnalytics,
  setLocation,
  setAdExchange,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      id="intelligence-sidebar"
      className="relative flex-shrink-0 border-l border-[#1F2937] bg-[#030712]/80 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden"
      style={{ width: open ? "30%" : "52px" }}
    >
      {/* ── Collapse toggle button ── */}
      <button
        id="sidebar-toggle-btn"
        onClick={() => setOpen(!open)}
        className="
          absolute top-4 left-2 z-20
          w-7 h-7
          flex items-center justify-center
          rounded-full
          border border-[#1F2937]
          bg-[#07101A]
          text-[#38BDF8]
          text-sm font-bold
          transition-all duration-200
          hover:bg-[#1F2937] hover:border-[#38BDF8]/40
          shadow-lg
        "
        title={open ? "Collapse sidebar" : "Expand sidebar"}
      >
        <span
          className="transition-transform duration-300 inline-block"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ›
        </span>
      </button>

      {/* Collapsed state — vertical label */}
      {!open && (
        <div className="h-full flex items-center justify-center animate-fade-in pt-14">
          <div
            className="text-[10px] font-bold tracking-[0.3em] text-[#38BDF8]/60 uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Intelligence Panel
          </div>
        </div>
      )}

      {/* Open state — full sidebar content */}
      {open && (
        <div className="h-full overflow-y-auto px-4 pt-12 pb-4 animate-slide-in-right">
          {/* Sidebar header label */}
          <div className="mb-4 flex items-center gap-2">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.4), transparent)" }}
            />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#38BDF8]/60 uppercase flex-shrink-0">
              Intelligence Sidebar
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(270deg, rgba(56,189,248,0.4), transparent)" }}
            />
          </div>

          {/* ── Section D: Filters ── */}
          <div className="mb-4">
            <PartnerFilters
              analytics={analytics}
              location={location}
              adExchange={adExchange}
              setAnalytics={setAnalytics}
              setLocation={setLocation}
              setAdExchange={setAdExchange}
            />
          </div>

          {/* ── Sections A-C + E ── */}
          <Sidebar
            analytics={analytics}
            location={location}
            adExchange={adExchange}
          />

          <div className="h-8" />
        </div>
      )}
    </aside>
  );
}