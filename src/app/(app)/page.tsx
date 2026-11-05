import { Inbox } from "@/components/inbox";
import { me, threads } from "@/lib/data";

export default async function ThreadsPage({ searchParams }: PageProps<"/">) {
  const { view, label, tier } = await searchParams;

  let list = threads;
  let title = "All threads";
  if (view === "mine") {
    list = list.filter((t) => t.assignee === me);
    title = "Your threads";
  } else if (view === "unassigned") {
    list = list.filter((t) => !t.assignee);
    title = "Unassigned threads";
  } else if (typeof label === "string") {
    list = list.filter((t) => t.label === label);
    title = label;
  } else if (typeof tier === "string") {
    list = list.filter((t) => t.tier === tier);
    title = tier;
  }

  return <Inbox key={title} title={title} threads={list} />;
}
