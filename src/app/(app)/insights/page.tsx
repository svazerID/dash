import type { Metadata } from "next";
import { Building2, ChevronDown, Diamond, Info, Layers, MessagesSquare, Search, SignalHigh, Tag, Users } from "lucide-react";
import { Sparkline, VolumeChart } from "@/components/insight-charts";
import { companyStats, firstResponse, labelStats, queueSize, resolution, tierColor, tierStats, volume } from "@/lib/data";

export const metadata: Metadata = { title: "Insights · Dash" };

const filters = [
  { label: "Companies", icon: Building2 },
  { label: "Tiers", icon: Layers },
  { label: "Labels", icon: Tag },
  { label: "Groups", icon: Users },
  { label: "Channels", icon: MessagesSquare },
  { label: "Priorities", icon: SignalHigh },
];

const labelBar = ["bg-indigo-500", "bg-indigo-400", "bg-indigo-300", "bg-indigo-200"];

function Panel({ title, children, range = true }: { title: string; children: React.ReactNode; range?: boolean }) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white">
      <header className="flex items-center justify-between border-b border-zinc-100 px-5 py-3">
        <h2 className="font-medium">{title}</h2>
        {range && (
          <button className="flex items-center gap-1 text-[13px] text-zinc-600 hover:text-zinc-900">
            Last 28 days <ChevronDown className="size-3.5" />
          </button>
        )}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Metric({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-xs text-zinc-500">
        {label} <Info className="size-3 text-zinc-300" />
      </p>
      <p className="mt-0.5 text-lg font-medium tracking-tight">
        {value} {suffix && <span className="text-sm font-normal text-zinc-500">{suffix}</span>}
      </p>
    </div>
  );
}

export default function InsightsPage() {
  const totalLabels = labelStats.reduce((s, l) => s + l.volume, 0);
  const maxCompany = Math.max(...companyStats.map((c) => c.value));
  const maxTier = Math.max(...tierStats.map((t) => t.value));

  return (
    <div className="min-h-full bg-zinc-50/50">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium tracking-tight">Insights</h1>
        <div className="flex flex-wrap gap-1.5">
          {filters.map(({ label, icon: Icon }) => (
            <button key={label} className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[13px] text-zinc-700 shadow-xs hover:bg-zinc-50">
              <Icon className="size-3.5 text-zinc-400" /> {label}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 p-6">
        <Panel title="Overview">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <Metric label="Queue size" value="28" suffix="in todo" />
              <Sparkline data={queueSize} />
            </div>
            <div>
              <Metric label="Median first response time" value="2h 43m" />
              <Sparkline data={firstResponse} unit="h" />
            </div>
            <div>
              <Metric label="Median resolution time" value="4h 44m" />
              <Sparkline data={resolution} unit="h" />
            </div>
          </div>
        </Panel>

        <Panel title="Support volume">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <Metric label="Queue size" value="28" suffix="in todo right now" />
            <div className="flex gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full border-2 border-indigo-600" />Threads in Todo</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full border-2 border-indigo-300" />Volume of new and re-opened threads</span>
            </div>
          </div>
          <VolumeChart data={volume} />
        </Panel>

        <Panel title="Labels">
          <div className="flex h-3 overflow-hidden rounded-full">
            {labelStats.map((l, i) => (
              <div key={l.label} className={`${labelBar[i]} border-r-2 border-white last:border-0`} style={{ width: `${(l.volume / totalLabels) * 100}%` }} title={`${l.label}: ${l.volume}`} />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-600">
            {labelStats.map((l, i) => (
              <span key={l.label} className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${labelBar[i]}`} /> {l.label} <span className="text-zinc-400">{l.volume}</span>
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-md border border-zinc-200 px-2.5 py-1.5 text-[13px] text-zinc-400 sm:max-w-xs">
            <Search className="size-3.5" /> Search labels
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] text-[13px]">
              <thead>
                <tr className="border-y border-zinc-100 bg-zinc-50 text-left text-xs text-zinc-500">
                  <th className="px-3 py-2 font-medium">Label</th>
                  <th className="px-3 py-2 font-medium">Volume</th>
                  <th className="px-3 py-2 font-medium">Median first response time</th>
                  <th className="px-3 py-2 font-medium">Median resolution time</th>
                </tr>
              </thead>
              <tbody>
                {labelStats.map((l) => (
                  <tr key={l.label} className="border-b border-zinc-100 last:border-0">
                    <td className="px-3 py-2.5"><span className="flex items-center gap-2"><Tag className="size-3.5 text-zinc-400" />{l.label}</span></td>
                    <td className="px-3 py-2.5 tabular-nums">{l.volume}</td>
                    <td className="px-3 py-2.5 tabular-nums">{l.frt}</td>
                    <td className="px-3 py-2.5 tabular-nums">{l.resolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="SLA compliance">
            <p className="text-2xl font-medium tracking-tight">100% <span className="text-sm font-normal text-zinc-500">average, last 28 days</span></p>
            <div className="mt-4 h-2.5 rounded-full bg-zinc-100"><div className="h-full w-full rounded-full bg-emerald-400" /></div>
            <div className="mt-2 flex justify-between text-[11px] text-zinc-400">
              {["0%", "25%", "50%", "75%", "100%"].map((t) => <span key={t}>{t}</span>)}
            </div>
          </Panel>

          <Panel title="Companies" range={false}>
            <ul className="space-y-3">
              {companyStats.map((c) => (
                <li key={c.name}>
                  <div className="flex justify-between text-[13px]"><span>{c.name}</span><span className="tabular-nums text-zinc-500">{c.value}</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-zinc-100"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${(c.value / maxCompany) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Tiers" range={false}>
            <ul className="space-y-3">
              {tierStats.map((t) => (
                <li key={t.tier}>
                  <div className="flex justify-between text-[13px]">
                    <span className="flex items-center gap-1.5"><Diamond className={`size-2.5 fill-current ${tierColor[t.tier]}`} />{t.tier}</span>
                    <span className="tabular-nums text-zinc-500">{t.value.toLocaleString("en-US")}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-zinc-100"><div className={`h-full rounded-full ${t.bar}`} style={{ width: `${(t.value / maxTier) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
