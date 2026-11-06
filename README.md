# dash

Dashboard support B2B (inbox thread + Insights) berbasis Next.js 16, berjalan di Cloudflare Workers lewat [OpenNext](https://opennext.js.org/cloudflare).

## Halaman

- `/` — inbox thread: tab Todo/Snoozed/Done, dikelompokkan per prioritas (Breaching/Urgent/Normal), panel percakapan dengan balasan, snooze, dan mark as done. Filter lewat sidebar (`?view=mine|unassigned`, `?label=…`, `?tier=…`).
- `/insights` — queue size, first response & resolution time, support volume, labels, SLA, companies, tiers.

Data masih berupa contoh statis di `src/lib/data.ts`.

## Pengembangan

```bash
pnpm install
pnpm dev        # next dev (http://localhost:3000)
pnpm preview    # build OpenNext + jalankan di workerd lokal
```

## Deploy ke Cloudflare Workers

```bash
pnpm build           # opennextjs-cloudflare build → .open-next/
npx wrangler login   # sekali saja, atau set CLOUDFLARE_API_TOKEN
npx wrangler deploy
```

Atau sekaligus: `pnpm run deploy`.

Workers Builds (dashboard Cloudflare): build command `pnpm run build`, deploy command `npx wrangler deploy`. Script `build` menjalankan build OpenNext; `next build` biasa ada di `pnpm build:next`.

> `cacheComponents` sengaja dimatikan di `next.config.ts`: dengan opsi itu request hang di runtime Workers.
