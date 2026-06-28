"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as echarts from "echarts/core";
import {
  BarChart,
  RadarChart,
  LineChart,
} from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  RadarComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// Register only what we use (tree-shakable)
echarts.use([
  BarChart,
  RadarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  RadarComponent,
  TitleComponent,
  CanvasRenderer,
]);

interface AnalyticsChartProps {
  analytics: boolean;
  location: boolean;
  adExchange: boolean;
}

// ─── Shared ECharts theme ───────────────────────────────────────────────────
const TOOLTIP_STYLE = {
  backgroundColor: "#07101A",
  borderColor: "#1F2937",
  borderWidth: 1,
  textStyle: { color: "#e2e8f0", fontSize: 12, fontFamily: "Inter, sans-serif" },
  extraCssText: "border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.6);",
};

const AXIS_LABEL_STYLE = {
  color: "#64748b",
  fontSize: 11,
  fontFamily: "Inter, sans-serif",
};

const SPLIT_LINE_STYLE = { lineStyle: { color: "#1F2937", width: 1 } };

// ─── Chart 1: Risk Breakdown (Horizontal Bar) ───────────────────────────────
function RiskBreakdownChart({
  analytics,
  location,
  adExchange,
}: AnalyticsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  const partners = useMemo(() => [
    { name: "Mobile App\n(Base)",      value: 20,  color: "#818CF8", active: true },
    { name: "Analytics SDK",            value: analytics  ? 20 : 0, color: "#FBBF24", active: analytics  },
    { name: "Location Provider",        value: location   ? 30 : 0, color: "#34D399", active: location   },
    { name: "Ad Exchange",              value: adExchange ? 30 : 0, color: "#F87171", active: adExchange },
  ], [analytics, location, adExchange]);

  const total = partners.reduce((s, p) => s + p.value, 0);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!instanceRef.current) {
      instanceRef.current = echarts.init(chartRef.current, undefined, {
        renderer: "canvas",
      });
    }

    const chart = instanceRef.current;

    const option: echarts.EChartsCoreOption = {
      backgroundColor: "transparent",
      grid: { left: 130, right: 60, top: 10, bottom: 10, containLabel: false },
      tooltip: {
        ...TOOLTIP_STYLE,
        trigger: "axis",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const p = params[0];
          return `<div style="font-weight:600;color:${p.color}">${p.name}</div><div>Risk contribution: <b style="color:${p.color}">+${p.value}</b> pts</div>`;
        },
      },
      xAxis: {
        type: "value",
        max: 40,
        axisLabel: { ...AXIS_LABEL_STYLE, formatter: (v: number) => `+${v}` },
        splitLine: SPLIT_LINE_STYLE,
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: "category",
        data: partners.map((p) => p.name),
        axisLabel: {
          ...AXIS_LABEL_STYLE,
          color: (v: string, i: number) =>
            partners[i].active ? "#cbd5e1" : "#374151",
        },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          type: "bar",
          data: partners.map((p) => ({
            value: p.value,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: p.active ? p.color + "40" : "#1F2937" },
                { offset: 1, color: p.active ? p.color : "#374151" },
              ]),
              borderRadius: [0, 6, 6, 0],
            },
          })),
          barMaxWidth: 18,
          label: {
            show: true,
            position: "right",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (p: any) =>
              p.value > 0 ? `{a|+${p.value}}` : `{b|OFF}`,
            rich: {
              a: { color: "#38BDF8", fontWeight: 700, fontSize: 11, fontFamily: "monospace" },
              b: { color: "#374151", fontWeight: 600, fontSize: 10 },
            },
          },
        },
      ],
    };

    chart.setOption(option);

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(chartRef.current);
    return () => {
      ro.disconnect();
    };
  }, [analytics, location, adExchange, partners]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
          Risk Contribution per Partner
        </p>
        <span
          className="terminal-text text-sm font-black"
          style={{
            color: total >= 70 ? "#F87171" : total >= 40 ? "#FBBF24" : "#34D399",
          }}
        >
          Total: {total}/100
        </span>
      </div>
      <div ref={chartRef} style={{ height: 140, width: "100%" }} />
    </div>
  );
}

const TIMES  = ["12:01:01", "12:01:02", "12:01:03", "12:01:04", "12:01:05"];
const SIGNALS = [1, 3, 5, 8, 12]; // cumulative signals emitted per event

// ─── Chart 2: Signal Volume Timeline (Line) ──────────────────────────────────
function SignalTimelineChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!instanceRef.current) {
      instanceRef.current = echarts.init(chartRef.current, undefined, {
        renderer: "canvas",
      });
    }

    const chart = instanceRef.current;

    const option: echarts.EChartsCoreOption = {
      backgroundColor: "transparent",
      grid: { left: 30, right: 20, top: 20, bottom: 24, containLabel: true },
      tooltip: {
        ...TOOLTIP_STYLE,
        trigger: "axis",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const p = params[0];
          return `<div style="color:#64748b;margin-bottom:4px">${p.name}</div><div>Cumulative signals: <b style="color:#38BDF8">${p.value}</b></div>`;
        },
      },
      xAxis: {
        type: "category",
        data: TIMES,
        axisLabel: { ...AXIS_LABEL_STYLE, fontSize: 10 },
        axisLine: { lineStyle: { color: "#1F2937" } },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        axisLabel: { ...AXIS_LABEL_STYLE },
        splitLine: SPLIT_LINE_STYLE,
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          type: "line",
          data: animated ? SIGNALS : [0, 0, 0, 0, 0],
          smooth: 0.4,
          symbol: "circle",
          symbolSize: 7,
          itemStyle: { color: "#38BDF8", borderColor: "#030712", borderWidth: 2 },
          lineStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#818CF8" },
              { offset: 1, color: "#38BDF8" },
            ]),
            width: 2.5,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(56,189,248,0.2)" },
              { offset: 1, color: "rgba(56,189,248,0.01)" },
            ]),
          },
          animation: true,
          animationDuration: 1200,
          animationEasing: "cubicOut",
        },
      ],
    };

    chart.setOption(option);

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(chartRef.current);
    return () => {
      ro.disconnect();
    };
  }, [animated]);

  return (
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">
        Cumulative Signals Over Event Sequence
      </p>
      <div ref={chartRef} style={{ height: 140, width: "100%" }} />
    </div>
  );
}

// ─── Chart 3: Privacy Radar ──────────────────────────────────────────────────
function PrivacyRadarChart({ analytics, location, adExchange }: AnalyticsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!instanceRef.current) {
      instanceRef.current = echarts.init(chartRef.current, undefined, {
        renderer: "canvas",
      });
    }

    const chart = instanceRef.current;

    const indicators = [
      { name: "Location\nExposure",  max: 100 },
      { name: "Fingerprinting",       max: 100 },
      { name: "Profiling",            max: 100 },
      { name: "Data\nBrokering",      max: 100 },
      { name: "Ad\nTracking",         max: 100 },
    ];

    // Scores per dimension based on active partners
    const scores = [
      location   ? 90 : 20,   // location exposure
      analytics || adExchange ? 80 : 25,  // fingerprinting
      analytics  ? 75 : 20,   // behavioral profiling
      adExchange ? 85 : 20,   // data brokering
      adExchange ? 95 : 15,   // ad tracking
    ];

    const option: echarts.EChartsCoreOption = {
      backgroundColor: "transparent",
      tooltip: {
        ...TOOLTIP_STYLE,
        trigger: "item",
      },
      radar: {
        indicator: indicators,
        radius: "62%",
        center: ["50%", "55%"],
        splitNumber: 4,
        axisName: {
          color: "#64748b", fontSize: 10, fontFamily: "Inter, sans-serif",
        },
        splitLine: { lineStyle: { color: ["#1F2937", "#1F2937", "#1F2937", "#1F2937"] } },
        splitArea: {
          areaStyle: {
            color: [
              "rgba(56,189,248,0.01)",
              "rgba(56,189,248,0.02)",
              "rgba(56,189,248,0.03)",
              "rgba(56,189,248,0.04)",
            ],
          },
        },
        axisLine: { lineStyle: { color: "#1F2937" } },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: scores,
              name: "Privacy Risk",
              itemStyle: { color: "#F87171" },
              lineStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "#818CF8" },
                  { offset: 1, color: "#F87171" },
                ]),
                width: 2,
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(248,113,113,0.3)" },
                  { offset: 1, color: "rgba(129,140,248,0.1)" },
                ]),
              },
            },
          ],
          animation: true,
          animationDuration: 1000,
          animationEasing: "elasticOut",
        },
      ],
    };

    chart.setOption(option);

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(chartRef.current);
    return () => {
      ro.disconnect();
    };
  }, [analytics, location, adExchange]);

  return (
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">
        Privacy Risk Radar
      </p>
      <div ref={chartRef} style={{ height: 200, width: "100%" }} />
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function AnalyticsCharts({
  analytics,
  location,
  adExchange,
}: AnalyticsChartProps) {
  return (
    <div className="space-y-6">

      {/* ECharts badge */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs terminal-text text-slate-600">POWERED BY</span>
        <span
          className="text-xs font-bold tracking-widest px-2 py-0.5 rounded"
          style={{
            background: "rgba(56,189,248,0.1)",
            border: "1px solid rgba(56,189,248,0.2)",
            color: "#38BDF8",
          }}
        >
          ECHARTS
        </span>
        <span className="text-xs terminal-text text-slate-600">· ANALYTICS ENGINE</span>
      </div>

      {/* Risk Breakdown Bar */}
      <div
        className="glass-card rounded-xl p-4"
        style={{ borderColor: "rgba(248,113,113,0.15)" }}
      >
        <RiskBreakdownChart
          analytics={analytics}
          location={location}
          adExchange={adExchange}
        />
      </div>

      {/* Signal Timeline Line */}
      <div
        className="glass-card rounded-xl p-4"
        style={{ borderColor: "rgba(56,189,248,0.15)" }}
      >
        <SignalTimelineChart />
      </div>

      {/* Privacy Radar */}
      <div
        className="glass-card rounded-xl p-4"
        style={{ borderColor: "rgba(129,140,248,0.15)" }}
      >
        <PrivacyRadarChart
          analytics={analytics}
          location={location}
          adExchange={adExchange}
        />
      </div>
    </div>
  );
}
