"use client";

import { useState } from "react";

import Sidebar from "@/components/sidebar";
import EventReplay from "@/components/event-replay";
import EmittedFieldsTable from "@/components/emitted-fields-table";
import PartnerChain from "@/components/partner-chain";
import PartnerFilters from "../components/partner-filters";

export default function Home() {
  const [analytics, setAnalytics] =
    useState(true);

  const [location, setLocation] =
    useState(true);

  const [adExchange, setAdExchange] =
    useState(true);

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-[#1F2937] px-6 py-4">
        <h1 className="text-2xl font-bold">
          Data Exhaust from a Single Tap
        </h1>
        <p className="text-sm text-slate-400">
          Real Rails Intelligence Library
        </p>
      </header>

      {/* Main Layout */}
      <section className="flex h-[calc(100vh-80px)] overflow-hidden">
        
        {/* 70% Visualization Area */}
        <div className="w-[70%] border-r border-[#1F2937] p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="rounded-xl border border-[#1F2937] bg-[#0B1117] p-4">
              <PartnerChain
                analytics={analytics}
                location={location}
                adExchange={adExchange}
              />
            </div>

            <div className="rounded-xl border border-[#1F2937] bg-[#0B1117] p-4">
              <EventReplay />
            </div>

            <div className="rounded-xl border border-[#1F2937] bg-[#0B1117] p-4">
              <EmittedFieldsTable />
            </div>
          </div>
        </div>

        {/* 30% Sidebar */}
        <aside className="w-[30%] p-6 overflow-y-auto">
          <Sidebar />

          <PartnerFilters
            analytics={analytics}
            location={location}
            adExchange={adExchange}
            setAnalytics={setAnalytics}
            setLocation={setLocation}
            setAdExchange={setAdExchange}
          />
        </aside>

      </section>
    </main>
  );
}