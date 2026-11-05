"use client";

import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = { day: string; tick?: string; v: number };

const axis = { tickLine: false, axisLine: false, fontSize: 10, stroke: "#a1a1aa" } as const;
const tooltip = { borderRadius: 8, border: "1px solid #e4e4e7", fontSize: 12, boxShadow: "0 4px 12px rgb(0 0 0 / .06)" };
const tickFormatter = (_: string, i: number, data: Point[]) => data[i]?.tick ?? "";

export function Sparkline({ data, unit }: { data: Point[]; unit?: string }) {
  return (
    <ResponsiveContainer width="100%" height={110}>
      <ComposedChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#f4f4f5" />
        <XAxis dataKey="day" {...axis} interval={0} padding={{ left: 14, right: 6 }} tickFormatter={(v, i) => tickFormatter(v, i, data)} />
        <YAxis orientation="right" {...axis} width={28} tickFormatter={(v) => `${v}${unit ?? ""}`} />
        <Tooltip contentStyle={tooltip} labelFormatter={() => ""} formatter={(v) => [`${v}${unit ?? ""}`, ""]} />
        <Area type="monotone" dataKey="v" stroke="none" fill="url(#spark)" />
        <Line type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={1.75} dot={false} activeDot={{ r: 3 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function VolumeChart({ data }: { data: (Point & { todo: number })[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#f4f4f5" />
        <XAxis dataKey="day" {...axis} interval={0} padding={{ left: 14, right: 6 }} tickFormatter={(v, i) => tickFormatter(v, i, data)} />
        <YAxis orientation="right" {...axis} width={28} />
        <Tooltip contentStyle={tooltip} cursor={{ fill: "#f4f4f5" }} labelFormatter={() => ""} />
        <Bar dataKey="v" name="New & re-opened" fill="#c7d2fe" radius={[3, 3, 0, 0]} />
        <Line type="monotone" dataKey="todo" name="Threads in Todo" stroke="#4f46e5" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
