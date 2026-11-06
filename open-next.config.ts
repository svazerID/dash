import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = {
  ...defineCloudflareConfig(),
  // `pnpm build` runs the OpenNext build, so OpenNext must call Next directly to avoid recursion.
  buildCommand: "next build",
};

export default config;
