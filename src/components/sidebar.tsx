"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  Bug,
  ChevronDown,
  ChevronsUpDown,
  CircleHelp,
  Diamond,
  Layers,
  Lightbulb,
  MessageSquare,
  MessagesSquare,
  Search,
  Tag,
  UserCircle,
} from "lucide-react";
import { labels, me, threads, tierColor, tiers, type Label } from "@/lib/data";

const labelIcon: Record<Label, typeof Bug> = {
  "Bug report": Bug,
  "Feature request": Lightbulb,
  Question: CircleHelp,
};

const todo = threads.filter((t) => t.status === "todo");

function Item({
  href,
  active,
  icon: Icon,
  iconClass,
  children,
  count,
  highlight,
}: {
  href: string;
  active: boolean;
  icon: typeof Bug;
  iconClass?: string;
  children: React.ReactNode;
  count?: number;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors ${
        active ? "bg-indigo-50 font-medium text-zinc-900" : "text-zinc-700 hover:bg-zinc-100"
      }`}
    >
      <Icon className={`size-4 shrink-0 ${iconClass ?? "text-zinc-400"}`} strokeWidth={1.75} />
      <span className="flex-1 truncate">{children}</span>
      {count !== undefined && (
        <span
          className={`min-w-5 rounded px-1 text-center text-[11px] tabular-nums ${
            highlight && active ? "bg-indigo-500 text-white" : "text-zinc-400"
          }`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

function Group({ title, icon: Icon, children }: { title: string; icon: typeof Bug; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] text-zinc-700 hover:bg-zinc-100"
      >
        <Icon className="size-4 text-zinc-400" strokeWidth={1.75} />
        <span className="flex-1 text-left">{title}</span>
        <ChevronDown className={`size-3.5 text-zinc-400 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div className="mt-0.5 space-y-0.5 pl-4">{children}</div>}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const params = useSearchParams();
  const onInbox = pathname === "/";
  const view = params.get("view");
  const label = params.get("label");
  const tier = params.get("tier");
  const isAll = onInbox && !view && !label && !tier;

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50/80">
      <div className="flex h-14 items-center gap-2 px-4">
        <div className="grid size-6 place-items-center rounded-md bg-zinc-900 text-[11px] font-bold text-white">A</div>
        <span className="flex-1 text-sm font-semibold">Atrium</span>
        <ChevronsUpDown className="size-3.5 text-zinc-400" />
        <Search className="ml-2 size-4 text-zinc-400" />
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        <Item href="/" active={isAll} icon={MessagesSquare} count={todo.length} highlight>
          All threads
        </Item>
        <Item href="/?view=mine" active={onInbox && view === "mine"} icon={MessageSquare} count={todo.filter((t) => t.assignee === me).length}>
          Your threads
        </Item>
        <Item href="/?view=unassigned" active={onInbox && view === "unassigned"} icon={UserCircle} count={todo.filter((t) => !t.assignee).length}>
          Unassigned threads
        </Item>

        <div className="pt-4">
          <Item href="/insights" active={pathname === "/insights"} icon={BarChart3}>
            Insights
          </Item>
        </div>

        <p className="px-2 pt-5 pb-1 text-[11px] font-medium text-zinc-400">Browse</p>
        <Group title="Labels" icon={Tag}>
          {labels.map((l) => (
            <Item key={l} href={`/?label=${encodeURIComponent(l)}`} active={onInbox && label === l} icon={labelIcon[l]} count={todo.filter((t) => t.label === l).length}>
              {l}
            </Item>
          ))}
        </Group>
        <Group title="Tiers" icon={Layers}>
          {tiers.map((t) => (
            <Item key={t} href={`/?tier=${t}`} active={onInbox && tier === t} icon={Diamond} iconClass={`${tierColor[t]} fill-current`} count={todo.filter((x) => x.tier === t).length}>
              {t}
            </Item>
          ))}
        </Group>
      </nav>

      <div className="flex items-center gap-2 border-t border-zinc-200 px-4 py-3">
        <span className="grid size-6 place-items-center rounded-full bg-rose-200 text-[10px] font-semibold text-rose-900">CC</span>
        <span className="text-[13px] text-zinc-700">{me}</span>
      </div>
    </aside>
  );
}
