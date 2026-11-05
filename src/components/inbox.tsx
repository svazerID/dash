"use client";

import { useMemo, useState } from "react";
import {
  AlarmClock,
  AtSign,
  CheckCircle2,
  Circle,
  CircleCheck,
  CloudCog,
  CornerUpLeft,
  Diamond,
  Equal,
  Lightbulb,
  Bug,
  CircleHelp,
  MoreHorizontal,
  Paperclip,
  Siren,
  Sparkles,
  TriangleAlert,
  Type,
  X,
} from "lucide-react";
import { me, tierColor, type Label, type Message, type Priority, type Status, type Thread } from "@/lib/data";

const groups: { key: Priority; label: string; icon: React.ReactNode }[] = [
  { key: "breaching", label: "Breaching", icon: <span className="grid size-4 place-items-center rounded bg-red-500"><Siren className="size-3 text-white" /></span> },
  { key: "urgent", label: "Urgent", icon: <span className="grid size-4 place-items-center rounded bg-red-500"><TriangleAlert className="size-3 text-white" /></span> },
  { key: "normal", label: "Normal", icon: <Equal className="size-4 text-zinc-400" /> },
];

const labelIcon: Record<Label, typeof Bug> = { "Bug report": Bug, "Feature request": Lightbulb, Question: CircleHelp };

function Avatar({ initials, className = "" }: { initials: string; className?: string }) {
  const hue = (initials.charCodeAt(0) * 37 + initials.charCodeAt(1) * 11) % 360;
  return (
    <span
      className={`grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-zinc-800 ${className}`}
      style={{ background: `hsl(${hue} 70% 85%)` }}
    >
      {initials}
    </span>
  );
}

function Chip({ children, tone = "plain" }: { children: React.ReactNode; tone?: "orange" | "blue" | "plain" }) {
  const tones = {
    orange: "bg-orange-50 text-orange-900 ring-orange-200",
    blue: "bg-indigo-50 text-indigo-900 ring-indigo-200",
    plain: "bg-white text-zinc-700 ring-zinc-200",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ring-1 ring-inset whitespace-nowrap ${tones[tone]}`}>{children}</span>;
}

function SlackMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" aria-hidden>
      <rect x="10" y="2" width="4" height="9" rx="2" fill="#36C5F0" />
      <rect x="13" y="10" width="9" height="4" rx="2" fill="#2EB67D" />
      <rect x="10" y="13" width="4" height="9" rx="2" fill="#ECB22E" />
      <rect x="2" y="10" width="9" height="4" rx="2" fill="#E01E5A" />
    </svg>
  );
}

export function Inbox({ title, threads: initial }: { title: string; threads: Thread[] }) {
  const [threads, setThreads] = useState(initial);
  const [tab, setTab] = useState<Status>("todo");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      todo: threads.filter((t) => t.status === "todo").length,
      snoozed: threads.filter((t) => t.status === "snoozed").length,
      done: threads.filter((t) => t.status === "done").length,
    }),
    [threads],
  );
  const visible = threads.filter((t) => t.status === tab);
  const selected = threads.find((t) => t.id === selectedId) ?? null;

  const update = (id: string, patch: Partial<Thread>) =>
    setThreads((all) => all.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const tabs: { key: Status; label: string; icon: typeof Circle }[] = [
    { key: "todo", label: "Todo", icon: Circle },
    { key: "snoozed", label: "Snoozed", icon: AlarmClock },
    { key: "done", label: "Done", icon: CheckCircle2 },
  ];

  return (
    <div className="flex h-full">
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="px-6 pt-6 pb-4">
          <h1 className="text-xl font-medium tracking-tight">{title}</h1>
          <div role="tablist" className="mt-4 inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 text-[13px]">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 ${
                  tab === key ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200" : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <Icon className={`size-3.5 ${key === "todo" && tab === key ? "text-indigo-500" : ""}`} />
                {label}
                {key !== "done" && <span className="text-zinc-400 tabular-nums">{counts[key]}</span>}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto border-t border-zinc-200">
          {visible.length === 0 && (
            <div className="grid place-items-center py-24 text-center text-sm text-zinc-500">
              <CircleCheck className="mb-2 size-6 text-zinc-300" />
              Nothing here. Enjoy the quiet.
            </div>
          )}
          {groups.map((g) => {
            const rows = visible.filter((t) => t.priority === g.key);
            if (!rows.length) return null;
            return (
              <div key={g.key}>
                <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-6 py-2 text-[13px] font-medium">
                  {g.icon}
                  {g.label}
                  <span className="font-normal text-zinc-400">{rows.length}</span>
                </div>
                {rows.map((t) => {
                  const LabelIcon = labelIcon[t.label];
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className={`grid w-full grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 border-b sm:grid-cols-[180px_1fr_auto] border-zinc-100 px-6 py-3 text-left transition-colors hover:bg-zinc-50 ${
                        selectedId === t.id ? "bg-indigo-50/60 hover:bg-indigo-50/60" : ""
                      }`}
                    >
                      <div className="flex min-w-0 gap-2.5">
                        <span className="mt-0.5"><SlackMark /></span>
                        <div className="min-w-0">
                          <div className="truncate text-[13px] font-medium">{t.customer}</div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-500">
                            <span className={`grid size-3.5 place-items-center rounded-[3px] text-[8px] font-bold text-white ${t.companyColor}`}>{t.company[0]}</span>
                            <span className="truncate">{t.company}</span>
                          </div>
                        </div>
                      </div>
                      <div className="order-3 col-span-2 min-w-0 sm:order-none sm:col-span-1">
                        <div className="truncate text-[13px]">
                          <span className="font-medium">{t.title}</span>
                          <span className="ml-2 text-zinc-400">{t.preview}</span>
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {t.event === "New thread" ? (
                            <Chip tone="orange"><Sparkles className="size-3 text-orange-500" />New thread</Chip>
                          ) : (
                            <Chip tone="blue"><CornerUpLeft className="size-3 text-indigo-500" />New reply</Chip>
                          )}
                          <Chip><Diamond className={`size-2.5 fill-current ${tierColor[t.tier]}`} />{t.tier}</Chip>
                          <Chip><LabelIcon className="size-3 text-zinc-400" />{t.label}</Chip>
                        </div>
                      </div>
                      <div className="order-2 flex items-center gap-2 pt-0.5 text-xs text-zinc-400 sm:order-none">
                        {t.assignee ? <Avatar initials={t.assignee.split(" ").map((p) => p[0]).join("")} className="size-5 text-[8px]" /> : <span className="size-5 rounded-full border border-dashed border-zinc-300" />}
                        <span className="w-7 text-right tabular-nums">{t.updated}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>

      {selected && (
        <ThreadPanel
          thread={selected}
          onClose={() => setSelectedId(null)}
          onReply={(m) => update(selected.id, { messages: [...selected.messages, m], event: "New reply", updated: "now" })}
          onStatus={(status) => update(selected.id, { status })}
        />
      )}
    </div>
  );
}

function ThreadPanel({
  thread,
  onClose,
  onReply,
  onStatus,
}: {
  thread: Thread;
  onClose: () => void;
  onReply: (m: Message) => void;
  onStatus: (s: Status) => void;
}) {
  const [draft, setDraft] = useState("");
  const send = () => {
    if (!draft.trim()) return;
    onReply({ author: me, avatar: "CC", time: "Just now", body: [draft.trim()] });
    setDraft("");
  };

  return (
    <aside className="fixed inset-0 z-20 flex flex-col border-l border-zinc-200 bg-white shadow-xl lg:static lg:w-[440px] lg:shadow-none">
      <header className="flex items-start gap-3 border-b border-zinc-200 px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-zinc-400">{thread.id} · {thread.company}</p>
          <h2 className="mt-0.5 truncate font-medium">{thread.title}</h2>
        </div>
        <button aria-label="Close thread" onClick={onClose} className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700">
          <X className="size-4" />
        </button>
      </header>

      <div className="flex gap-2 border-b border-zinc-100 px-5 py-2.5">
        {thread.status !== "done" && (
          <button onClick={() => onStatus("done")} className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-2 py-1 text-xs hover:bg-zinc-50">
            <CheckCircle2 className="size-3.5 text-emerald-500" /> Mark as done
          </button>
        )}
        {thread.status !== "snoozed" && (
          <button onClick={() => onStatus("snoozed")} className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-2 py-1 text-xs hover:bg-zinc-50">
            <AlarmClock className="size-3.5 text-zinc-500" /> Snooze
          </button>
        )}
        {thread.status !== "todo" && (
          <button onClick={() => onStatus("todo")} className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-2 py-1 text-xs hover:bg-zinc-50">
            <Circle className="size-3.5 text-indigo-500" /> Move to todo
          </button>
        )}
      </div>

      <ol className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {thread.messages.map((m, i) => (
          <li key={i} className="group flex gap-3">
            <Avatar initials={m.avatar} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[13px]">
                <span className="font-medium">{m.author}</span>
                <span className="text-xs text-zinc-400">{m.time}</span>
                {m.internal && <span className="rounded bg-amber-100 px-1.5 text-[10px] font-medium text-amber-800">Internal note</span>}
                <MoreHorizontal className="ml-auto size-4 text-zinc-300 opacity-0 group-hover:opacity-100" />
              </div>
              {m.body.map((p, j) => (
                <p key={j} className="mt-1 text-[13px] leading-relaxed text-zinc-700">{p}</p>
              ))}
              {m.reactions && (
                <div className="mt-2 flex gap-1.5">
                  {m.reactions.map((r) => (
                    <span key={r} className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px]">{r}</span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="p-4">
        <div className="rounded-lg border border-zinc-200 shadow-sm focus-within:border-zinc-300 focus-within:ring-2 focus-within:ring-zinc-100">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send();
            }}
            rows={3}
            placeholder={`Reply to ${thread.customer.split(" ")[0]}…`}
            className="block w-full resize-none rounded-t-lg px-3 pt-2.5 text-[13px] outline-none placeholder:text-zinc-400"
          />
          <div className="flex items-center gap-3 px-3 pb-2.5 text-zinc-400">
            <AtSign className="size-4" />
            <CloudCog className="size-4" />
            <Paperclip className="size-4" />
            <Type className="size-4" />
            <button
              onClick={send}
              disabled={!draft.trim()}
              className="ml-auto flex items-center gap-2 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white disabled:opacity-40"
            >
              Send reply
              <kbd className="rounded border border-zinc-600 px-1 font-sans text-[10px] text-zinc-300">⌘ ↵</kbd>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
