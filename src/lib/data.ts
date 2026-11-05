export type Status = "todo" | "snoozed" | "done";
export type Priority = "breaching" | "urgent" | "normal";
export type Tier = "Enterprise" | "Paid" | "Free";
export type Label = "Bug report" | "Feature request" | "Question";

export type Message = {
  author: string;
  avatar: string;
  internal?: boolean;
  time: string;
  body: string[];
  reactions?: string[];
};

export type Thread = {
  id: string;
  customer: string;
  company: string;
  companyColor: string;
  title: string;
  preview: string;
  status: Status;
  priority: Priority;
  tier: Tier;
  label: Label;
  event: "New thread" | "New reply";
  assignee: string | null;
  updated: string;
  messages: Message[];
};

export const me = "Carla Cavani";

export const tierColor: Record<Tier, string> = {
  Enterprise: "text-blue-500",
  Paid: "text-emerald-400",
  Free: "text-amber-400",
};

const msgs = (customer: string, avatar: string, body: string): Message[] => [
  { author: customer, avatar, time: "3 hours ago", body: [body] },
];

export const threads: Thread[] = [
  {
    id: "T-1042", customer: "Daniel Chase", company: "Code Sandbox", companyColor: "bg-zinc-900",
    title: "SSO configuration", preview: "We're trying to enable SAML for our org but the redirect fails",
    status: "todo", priority: "breaching", tier: "Enterprise", label: "Bug report", event: "New thread",
    assignee: me, updated: "4m",
    messages: [
      { author: "Daniel Chase", avatar: "DC", time: "3 hours ago", body: ["Hey team, we're trying to enable SAML for our org but the redirect after login fails with a 400.", "Can you take a look and let me know?"], reactions: ["👍 1"] },
      { author: "Carla Cavani", avatar: "CC", internal: true, time: "3 hours ago", body: ["Looks like the ACS URL is missing the workspace suffix. Checking with engineering."] },
    ],
  },
  {
    id: "T-1041", customer: "Michael Porter", company: "Axiom", companyColor: "bg-indigo-600",
    title: "Invoice address", preview: "Our latest invoice still shows the old billing address",
    status: "todo", priority: "urgent", tier: "Paid", label: "Question", event: "New reply",
    assignee: null, updated: "22m",
    messages: msgs("Michael Porter", "MP", "Hi! Our latest invoice still shows the old billing address. Could you update it to our new office?"),
  },
  {
    id: "T-1040", customer: "Sofia Reynolds", company: "Clerk", companyColor: "bg-violet-600",
    title: "API request errors", preview: "Hey, we're getting weird errors with the events endpoint",
    status: "todo", priority: "urgent", tier: "Enterprise", label: "Bug report", event: "New thread",
    assignee: me, updated: "1h",
    messages: [
      { author: "Ben Braithwaite", avatar: "BB", time: "3 hours ago", body: ["Hey team, this looks a lot like the bug we had a couple of weeks ago.", "Can you take a look and let me know?"], reactions: ["👍 1", "✅ 1"] },
      { author: "Carla Cavani", avatar: "CC", time: "3 hours ago", body: ["Hey Ben, looking into this right now."], reactions: ["👍 1"] },
      { author: "Ben Braithwaite", avatar: "BB", time: "2 hours ago", body: ["No worries, thanks!"] },
      { author: "Carla Cavani", avatar: "CC", time: "2 hours ago", body: ["Yes, it looks like there was an issue. We're deploying a fix right now."] },
    ],
  },
  {
    id: "T-1039", customer: "Clara Green", company: "Trek", companyColor: "bg-sky-600",
    title: "User permissions issue after update", preview: "Since the last release, admins can't edit roles",
    status: "todo", priority: "normal", tier: "Free", label: "Bug report", event: "New reply",
    assignee: "Ben Braithwaite", updated: "2h",
    messages: msgs("Clara Green", "CG", "Since the last release, admins on our workspace can't edit roles anymore."),
  },
  {
    id: "T-1038", customer: "Emily Brooks", company: "Railway", companyColor: "bg-zinc-700",
    title: "More granular rules", preview: "Yeah, it'd be great if we could route by label too",
    status: "todo", priority: "normal", tier: "Enterprise", label: "Feature request", event: "New reply",
    assignee: null, updated: "3h",
    messages: msgs("Emily Brooks", "EB", "Yeah, it'd be great if we could route threads by label too, not just by tier."),
  },
  {
    id: "T-1037", customer: "Lucas Harris", company: "Inngest", companyColor: "bg-zinc-900",
    title: "Notification emails not delivering", preview: "Our team isn't getting notification emails from the system",
    status: "todo", priority: "normal", tier: "Paid", label: "Bug report", event: "New thread",
    assignee: me, updated: "5h",
    messages: msgs("Lucas Harris", "LH", "Our team isn't getting notification emails from the system. SendGrid shows they're sent, but no one is receiving them."),
  },
  {
    id: "T-1035", customer: "Annie Atkins", company: "Ollo", companyColor: "bg-orange-500",
    title: "Help managing user permissions", preview: "How do I give a teammate read-only access?",
    status: "snoozed", priority: "normal", tier: "Enterprise", label: "Question", event: "New thread",
    assignee: me, updated: "1d",
    messages: msgs("Annie Atkins", "AA", "How do I give a teammate read-only access to our workspace?"),
  },
  {
    id: "T-1031", customer: "Leo Hart", company: "Fieldwork", companyColor: "bg-emerald-600",
    title: "Export customers to CSV", preview: "Is there a way to export our full customer list?",
    status: "snoozed", priority: "normal", tier: "Free", label: "Feature request", event: "New reply",
    assignee: null, updated: "2d",
    messages: msgs("Leo Hart", "LH", "Is there a way to export our full customer list as CSV?"),
  },
  {
    id: "T-1027", customer: "Maya Putri", company: "Lumen", companyColor: "bg-pink-600",
    title: "Webhook retries", preview: "Thanks, the retries are working now!",
    status: "done", priority: "normal", tier: "Paid", label: "Question", event: "New reply",
    assignee: "Ben Braithwaite", updated: "3d",
    messages: msgs("Maya Putri", "MP", "Thanks, the retries are working now!"),
  },
];

export const labels: Label[] = ["Bug report", "Feature request", "Question"];
export const tiers: Tier[] = ["Enterprise", "Free", "Paid"];

// Insights (last 28 days)
const days = ["19 Jan", "", "", "", "", "", "", "26 Jan", "", "", "", "", "", "", "02 Feb", "", "", "", "", "", "", "09 Feb", "", "", "", "", "", "Today"];
const series = (vals: number[]) => vals.map((v, i) => ({ day: days[i] || `d${i}`, tick: days[i], v }));

export const queueSize = series([4, 6, 9, 8, 14, 22, 21, 24, 24, 31, 31, 30, 30, 34, 34, 22, 18, 20, 24, 22, 17, 15, 18, 20, 22, 25, 26, 28]);
export const firstResponse = series([2.2, 2.1, 2.3, 2.0, 2.1, 2.4, 2.9, 3.8, 3.9, 3.8, 3.7, 3.7, 4.1, 4.0, 2.4, 2.2, 2.3, 2.1, 2.0, 2.2, 2.3, 2.6, 2.5, 2.7, 2.6, 2.8, 2.7, 2.7]);
export const resolution = series([4.5, 4.1, 3.6, 3.2, 3.0, 3.9, 4.4, 4.8, 4.9, 5.1, 5.0, 5.2, 5.0, 4.9, 4.0, 3.4, 3.9, 4.6, 4.8, 4.4, 4.7, 5.2, 4.7, 4.3, 4.6, 4.9, 4.6, 4.7]);
export const volume = series([18, 22, 9, 6, 24, 26, 28, 12, 8, 30, 29, 34, 31, 36, 10, 7, 32, 38, 30, 33, 41, 14, 9, 28, 30, 27, 22, 24]).map((d, i) => ({
  ...d,
  todo: queueSize[i].v,
}));

export const labelStats = [
  { label: "Bug report", volume: 42, frt: "4h 06m", resolution: "4h 47m" },
  { label: "Feature request", volume: 31, frt: "3h 55m", resolution: "3h 56m" },
  { label: "Set-up and onboarding", volume: 29, frt: "3h 21m", resolution: "3h 37m" },
  { label: "API", volume: 8, frt: "1h 12m", resolution: "2h 05m" },
];

export const companyStats = [
  { name: "Trigger.dev", value: 329 },
  { name: "Railway", value: 241 },
  { name: "OpenAI", value: 188 },
  { name: "Atrium", value: 120 },
];

export const tierStats: { tier: Tier; value: number; bar: string }[] = [
  { tier: "Free", value: 3849, bar: "bg-amber-400" },
  { tier: "Paid", value: 2921, bar: "bg-emerald-400" },
  { tier: "Enterprise", value: 1793, bar: "bg-blue-500" },
];
