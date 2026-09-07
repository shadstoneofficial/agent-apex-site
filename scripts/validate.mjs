import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const required = ["index.html", "styles.css", "app.js", "404.html", "health.json", "data/slds.json", "data/showcase-domains.json", "assets/favicon.svg", "assets/social-card.svg"];
await Promise.all(required.map((file) => access(resolve(root, file))));

const html = await readFile(resolve(root, "index.html"), "utf8");
for (const fragment of ["<title>", "rel=\"canonical\"", "id=\"main\"", "prefers-reduced-motion", "Search for a .agent name"]) {
  const target = fragment === "prefers-reduced-motion" ? await readFile(resolve(root, "styles.css"), "utf8") : html;
  if (!target.includes(fragment)) throw new Error(`Missing required fragment: ${fragment}`);
}

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
if (new Set(ids).size !== ids.length) throw new Error("Duplicate HTML id found");

const snapshot = JSON.parse(await readFile(resolve(root, "data/slds.json"), "utf8"));
if (snapshot.schemaVersion !== 1 || !Array.isArray(snapshot.profiles) || snapshot.profiles.length < 3) {
  throw new Error("Invalid SLD showcase snapshot");
}
if (!snapshot.profiles.every((profile) => profile.domain?.endsWith(".agent"))) {
  throw new Error("Snapshot contains a non-.agent profile");
}

const health = JSON.parse(await readFile(resolve(root, "health.json"), "utf8"));
if (health.status !== "ok" || health.mode !== "registry-backed-tld-apex") throw new Error("Invalid health assertion");

console.log(`Validated ${required.length} release files, ${ids.length} unique HTML ids, and ${snapshot.profiles.length} public profiles.`);
