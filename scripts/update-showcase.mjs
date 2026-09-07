import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const apiRoot = "https://agents.headlessdomains.com/api/profile";
const dataDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "../data");
const destination = resolve(dataDirectory, "slds.json");
const config = JSON.parse(await readFile(resolve(dataDirectory, "showcase-domains.json"), "utf8"));
const domains = config.domains || [];
if (!domains.length || !domains.every((domain) => typeof domain === "string" && domain.endsWith(".agent"))) {
  throw new Error("showcase-domains.json must contain .agent domain names");
}

const results = await Promise.all(domains.map(async (domain) => {
  const response = await fetch(`${apiRoot}/${encodeURIComponent(domain)}`, { headers: { accept: "application/json", "user-agent": "agent-apex-showcase/1.0" } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Directory API returned ${response.status} for ${domain}`);
  return response.json();
}));

const profiles = results
  .filter((profile) => profile && typeof profile.domain === "string" && profile.domain.endsWith(".agent"))
  .map((profile) => ({
    domain: profile.domain,
    displayDomain: profile.display_domain || profile.domain,
    bio: typeof profile.bio === "string" ? profile.bio.slice(0, 240) : "",
    category: profile.category && profile.category !== "Uncategorized" ? String(profile.category).slice(0, 40) : null,
    mppEnabled: profile.mpp_enabled === true,
    inboxEnabled: profile.agent_inbox_enabled === true
  }));

if (profiles.length < 3) throw new Error(`Refusing to replace snapshot with only ${profiles.length} profiles`);

const snapshot = { schemaVersion: 1, source: apiRoot, generatedAt: new Date().toISOString(), profiles };
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(`Wrote ${profiles.length} public .agent profiles to ${destination}`);
