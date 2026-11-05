import Link from "next/link";
import { Suspense } from "react";
import { Sidebar } from "@/components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-white text-zinc-900">
      <div className="hidden md:block">
        <Suspense fallback={<div className="h-full w-60 border-r border-zinc-200 bg-zinc-50/80" />}>
          <Sidebar />
        </Suspense>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <nav className="flex items-center gap-4 border-b border-zinc-200 px-4 py-3 text-sm md:hidden">
          <span className="grid size-6 place-items-center rounded-md bg-zinc-900 text-[11px] font-bold text-white">A</span>
          <Link href="/" className="text-zinc-700">Threads</Link>
          <Link href="/insights" className="text-zinc-700">Insights</Link>
        </nav>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
