"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ReplayEvent } from "@/types/replay";

export default function EventReplay() {
  const [events, setEvents] = useState<ReplayEvent[]>([]);

  useEffect(() => {
    api.get("/api/replay").then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <div className="h-full">
      <h2 className="mb-6 text-xl font-semibold">
        Single Event Replay
      </h2>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="rounded-lg border border-[#1F2937] bg-[#0B1117] p-4"
          >
            <p className="text-cyan-400 text-sm">
              {event.time}
            </p>

            <h3 className="font-medium">
              {event.event}
            </h3>

            <p className="text-slate-400 text-sm">
              {event.actor}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}