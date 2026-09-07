const grid = document.querySelector("#identity-grid");
const meta = document.querySelector("#directory-meta");

const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
})[character]);

const renderProfiles = ({ profiles = [], generatedAt }) => {
  if (!profiles.length) throw new Error("No public profiles in snapshot");

  grid.innerHTML = profiles.map((profile, index) => {
    const labels = [profile.category, profile.mppEnabled ? "MPP" : null, profile.inboxEnabled ? "Inbox" : null].filter(Boolean);
    const rawDomain = profile.domain;
    const domain = escapeHTML(profile.displayDomain || rawDomain);
    const label = domain.endsWith(".agent") ? `${domain.slice(0, -6)}<span>.agent</span>` : domain;
    return `<a class="identity-card" href="https://agents.headlessdomains.com/entry/${encodeURIComponent(rawDomain)}" aria-label="View ${domain} in the public directory">
      <span class="card-index">${String(index + 1).padStart(2, "0")} / ID</span>
      <h3>${label}</h3>
      <p>${escapeHTML(profile.bio || "Public machine-readable identity in the .agent namespace.")}</p>
      <div class="card-tags">${labels.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
    </a>`;
  }).join("");

  const date = new Date(generatedAt);
  const readableDate = Number.isNaN(date.valueOf()) ? "current release" : date.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
  meta.textContent = `${profiles.length} featured / refreshed ${readableDate}`;
};

fetch("data/slds.json", { cache: "no-cache" })
  .then((response) => {
    if (!response.ok) throw new Error(`Snapshot request returned ${response.status}`);
    return response.json();
  })
  .then(renderProfiles)
  .catch(() => {
    meta.textContent = "Directory snapshot unavailable";
    grid.innerHTML = `<p class="notice">The profile selection could not be loaded. <a class="text-link" href="https://agents.headlessdomains.com/">Browse the public directory ↗</a></p>`;
  });

document.querySelector(".name-search")?.addEventListener("submit", (event) => {
  const input = event.currentTarget.elements.q;
  const value = input.value.trim().toLowerCase();
  if (!value) {
    event.preventDefault();
    input.focus();
    return;
  }
  input.value = value.includes(".") ? value : `${value}.agent`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
