"use client";

import { useState, useEffect } from "react";

import EventReplay from "@/components/event-replay";
import EmittedFieldsTable from "@/components/emitted-fields-table";
import CollapsibleSidebar from "@/components/collapsible-sidebar";
import PartnerChain from "@/components/partner-chain";
import AnalyticsCharts from "@/components/analytics-charts";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="terminal-text text-[#38BDF8] tabular-nums">
      {time}
    </span>
  );
}

function BackendStatus() {
  const [status, setStatus] = useState<"connected" | "disconnected" | "checking">("checking");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/replay");
        if (response.ok) {
          setStatus("connected");
        } else {
          setStatus("disconnected");
        }
      } catch (error) {
        setStatus("disconnected");
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (status === "checking") {
    return (
      <div className="flex items-center gap-1 text-xs text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse inline-block" />
        <span>CHECKING BACKEND...</span>
      </div>
    );
  }

  if (status === "disconnected") {
    return (
      <div className="flex items-center gap-1 text-xs text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] inline-block" />
        <span className="text-[#F87171]">BACKEND OFFLINE · USING MOCK DATA</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-xs text-slate-500">
      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse-dot inline-block" />
      <span className="text-[#34D399]">BACKEND CONNECTED · PORT 8000</span>
    </div>
  );
}

export default function Home() {
  const [analytics, setAnalytics] = useState(true);
  const [location, setLocation] = useState(true);
  const [adExchange, setAdExchange] = useState(true);

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-hidden relative">

      {/* Background grid overlay */}
      <div className="fixed inset-0 dot-grid pointer-events-none opacity-40" />

      {/* Ambient glow blobs */}
      <div
        className="fixed top-0 left-1/4 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-[400px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(129,140,248,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Header ── */}
      <header className="relative z-10 border-b border-[#1F2937] bg-[#030712]/90 backdrop-blur-md px-6 py-4">

        <div className="flex items-start justify-between">
          <div className="animate-fade-in-up">

            {/* Rail category label */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse-dot" />
              <span className="text-[#38BDF8] text-xs font-semibold tracking-[0.2em] uppercase">
                Real Rails Intelligence · Distribution &amp; Demand Rail
              </span>
            </div>

            {/* Main title */}
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
              <span className="gradient-text-cyan text-glow-cyan">
                DATA EXHAUST
              </span>
              <span className="text-white/90"> FROM A </span>
              <span className="gradient-text-cyan text-glow-cyan">
                SINGLE TAP
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-1 text-slate-400 text-sm tracking-wide">
              Trace the invisible data cascade triggered by one user interaction
            </p>
          </div>

          {/* Right: system status */}
          <div className="hidden md:flex flex-col items-end gap-1 animate-fade-in delay-300 opacity-0">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>SYS TIME</span>
              <LiveClock />
            </div>
            <BackendStatus />
          </div>
        </div>

        {/* Badge row */}
        <div className="mt-3 flex flex-wrap gap-2 animate-fade-in delay-200 opacity-0">
          <span className="badge-live">Live Demo</span>
          <span className="badge-synthetic">Synthetic Data</span>
          <span className="badge-info">5 Partners</span>
          <span className="badge-info">CFPB · GDELT Sources</span>
        </div>
      </header>

      {/* ── Main Layout: 70/30 split ── */}
      <section className="relative z-10 flex h-[calc(100vh-108px)] overflow-hidden">

        {/* 70% — Main Visualization Stage */}
        <div className="overflow-y-auto px-5 py-5" style={{ width: "70%", minWidth: 0 }}>

          <div className="space-y-5">

            {/* Partner Chain Panel */}
            <div
              className="glass-card rounded-2xl overflow-hidden animate-fade-in-up opacity-0"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              <div className="px-5 pt-4 pb-2 border-b border-[#1F2937]/60 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse-dot" />
                <h2 className="text-sm font-semibold tracking-widest uppercase text-[#38BDF8]">
                  Partner Data Chain
                </h2>
                <span className="ml-auto text-xs text-slate-500 terminal-text">
                  REACTFLOW · INTERACTIVE
                </span>
              </div>
              <PartnerChain
                analytics={analytics}
                location={location}
                adExchange={adExchange}
              />
            </div>

            {/* Event Replay Panel */}
            <div
              className="glass-card rounded-2xl overflow-hidden animate-fade-in-up opacity-0"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <div className="px-5 pt-4 pb-2 border-b border-[#1F2937]/60 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#818CF8] animate-pulse-dot" />
                <h2 className="text-sm font-semibold tracking-widest uppercase text-[#818CF8]">
                  Single Event Replay
                </h2>
                <span className="ml-auto text-xs text-slate-500 terminal-text">
                  SEQUENTIAL TIMELINE
                </span>
              </div>
              <div className="p-5">
                <EventReplay />
              </div>
            </div>

            {/* Analytics Charts Panel — ECharts */}
            <div
              className="glass-card rounded-2xl overflow-hidden animate-fade-in-up opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <div className="px-5 pt-4 pb-2 border-b border-[#1F2937]/60 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FBBF24] animate-pulse-dot" />
                <h2 className="text-sm font-semibold tracking-widest uppercase text-[#FBBF24]">
                  Analytics Intelligence
                </h2>
                <span className="ml-auto text-xs text-slate-500 terminal-text">
                  ECHARTS · REAL-TIME
                </span>
              </div>
              <div className="p-5">
                <AnalyticsCharts
                  analytics={analytics}
                  location={location}
                  adExchange={adExchange}
                />
              </div>
            </div>

            {/* Emitted Fields Panel */}
            <div
              className="glass-card rounded-2xl overflow-hidden animate-fade-in-up opacity-0"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <div className="px-5 pt-4 pb-2 border-b border-[#1F2937]/60 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse-dot" />
                <h2 className="text-sm font-semibold tracking-widest uppercase text-[#34D399]">
                  Emitted Fields
                </h2>
                <span className="ml-auto text-xs text-slate-500 terminal-text">
                  DATA PAYLOAD INSPECTOR
                </span>
              </div>
              <div className="p-5">
                <EmittedFieldsTable />
              </div>
            </div>

          </div>
        </div>

        {/* 30% — Intelligence Sidebar */}
        <CollapsibleSidebar
          analytics={analytics}
          location={location}
          adExchange={adExchange}
          setAnalytics={setAnalytics}
          setLocation={setLocation}
          setAdExchange={setAdExchange}
        />

      </section>
    </main>
  );
}