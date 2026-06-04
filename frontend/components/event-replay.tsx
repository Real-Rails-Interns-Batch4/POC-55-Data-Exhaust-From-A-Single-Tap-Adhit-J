"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { api } from "@/lib/api";
import { ReplayEvent } from "@/types/replay";

const ACTOR_CONFIG: Record<string, { icon: string; color: string; bg: string }> = {
  "User":              { icon: "👤", color: "#38BDF8", bg: "rgba(56,189,248,0.12)"  },
  "Analytics SDK":    { icon: "📊", color: "#FBBF24", bg: "rgba(251,191,36,0.12)"  },
  "Location Provider":{ icon: "📍", color: "#34D399", bg: "rgba(52,211,153,0.12)"  },
  "Ad Network":       { icon: "🎯", color: "#F87171", bg: "rgba(248,113,113,0.12)" },
  "Data Partner":     { icon: "🏢", color: "#818CF8", bg: "rgba(129,140,248,0.12)" },
};

function getActorConfig(actor: string) {
  return ACTOR_CONFIG[actor] ?? { icon: "⚡", color: "#38BDF8", bg: "rgba(56,189,248,0.12)" };
}

export const MOCK_EVENTS: ReplayEvent[] = [
  { time: "12:01:01", event: "User Tap",                actor: "User"              },
  { time: "12:01:02", event: "Analytics SDK Capture",   actor: "Analytics SDK"    },
  { time: "12:01:03", event: "Location Attached",        actor: "Location Provider"},
  { time: "12:01:04", event: "Ad Request Generated",     actor: "Ad Network"       },
  { time: "12:01:05", event: "Partner Receives Data",    actor: "Data Partner"     },
];

export default function EventReplay() {
  const [allEvents, setAllEvents] = useState<ReplayEvent[]>(MOCK_EVENTS);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    api.get("/api/replay")
      .then((res) => {
        setAllEvents(res.data);
        setVisibleCount(res.data.length);
      })
      .catch(() => {
        // Mock fallback per Real Rails guardrail — keep UI functional
        setVisibleCount(MOCK_EVENTS.length);
      });
  }, []);


  const startReplay = useCallback(() => {
    setVisibleCount(0);
    setExpanded(null);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (isPlaying && visibleCount < allEvents.length) {
      timerRef.current = setTimeout(() => {
        setVisibleCount((c) => c + 1);
      }, 600);
    } else if (isPlaying && visibleCount >= allEvents.length) {
      setIsPlaying(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, visibleCount, allEvents.length]);

  const visibleEvents = allEvents.slice(0, visibleCount);

  return (
    <div>
      {/* Header row with Replay button */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">
            {visibleCount} / {allEvents.length} events
          </span>
          {isPlaying && (
            <span className="terminal-text text-[#38BDF8] text-xs animate-pulse">
              ● REPLAYING
            </span>
          )}
        </div>

        <button
          id="replay-btn"
          onClick={startReplay}
          disabled={isPlaying}
          className="
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
            border border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8]
            hover:bg-[#38BDF8]/20 hover:border-[#38BDF8]/60
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 glow-cyan
          "
        >
          <span className="text-base">{isPlaying ? "⏳" : "▶"}</span>
          {isPlaying ? "Playing..." : "Replay Sequence"}
        </button>
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-3 top-0 w-px transition-all duration-500"
          style={{
            height: `${Math.max(visibleEvents.length * 88, 20)}px`,
            background: "linear-gradient(to bottom, #38BDF8, #818CF8, transparent)",
            opacity: 0.4,
          }}
        />

        {visibleEvents.map((event, index) => {
          const cfg = getActorConfig(event.actor);
          const isActive = index === visibleCount - 1 && isPlaying;
          const isOpen = expanded === index;

          return (
            <div
              key={`${event.time}-${index}`}
              className="relative mb-5 animate-fade-in-up"
              style={{
                animationDelay: isPlaying ? "0ms" : `${index * 60}ms`,
                animationFillMode: "forwards",
                opacity: 0,
              }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[21px] w-4 h-4 rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: cfg.color,
                  background: isActive ? cfg.color : "#030712",
                  boxShadow: isActive ? `0 0 12px ${cfg.color}` : `0 0 6px ${cfg.color}40`,
                  top: "14px",
                }}
              />

              {/* Event card */}
              <button
                className="w-full text-left rounded-xl border p-3 transition-all duration-200 group hover-glow"
                style={{
                  borderColor: isActive ? cfg.color : "rgba(31,41,55,0.8)",
                  background: isActive ? cfg.bg : "rgba(11,17,23,0.6)",
                  boxShadow: isActive ? `0 0 16px ${cfg.color}30` : "none",
                }}
                onClick={() => setExpanded(isOpen ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Actor badge */}
                    <span
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      <span>{cfg.icon}</span>
                      <span>{event.actor}</span>
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">
                        {event.event}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="terminal-text text-slate-500 text-xs">
                      {event.time}
                    </span>
                    <span
                      className="text-slate-600 text-xs transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      ▾
                    </span>
                  </div>
                </div>

                {/* Expandable details */}
                {isOpen && (
                  <div
                    className="mt-3 pt-3 border-t text-xs text-slate-400 animate-fade-in space-y-1"
                    style={{ borderColor: "rgba(31,41,55,0.5)" }}
                  >
                    <p>
                      <span style={{ color: cfg.color }}>Actor:</span>{" "}
                      {event.actor} — processes and forwards the event payload
                    </p>
                    <p>
                      <span style={{ color: cfg.color }}>Timestamp:</span>{" "}
                      <span className="terminal-text">{event.time}</span>
                    </p>
                    <p>
                      <span style={{ color: cfg.color }}>Data emitted:</span>{" "}
                      Device ID, Session token, IP address, and contextual metadata
                    </p>
                  </div>
                )}
              </button>
            </div>
          );
        })}

        {/* Blinking cursor at end while playing */}
        {isPlaying && (
          <div className="relative mb-2 pl-0">
            <div
              className="absolute -left-[21px] w-4 h-4 rounded-full border-2 border-[#38BDF8] animate-pulse"
              style={{ top: "4px", background: "rgba(56,189,248,0.2)" }}
            />
            <div className="h-3 w-24 rounded bg-[#38BDF8]/20 animate-pulse ml-0" />
          </div>
        )}
      </div>
    </div>
  );
}