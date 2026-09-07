# `.agent` apex working brief

## Identity and ownership

- Handshake name: `agent/`
- ASCII/Punycode form: `agent/` (no conversion required)
- Control evidence for this build: the authorized project brief identifies
  `.agent` as a live HeadlessDomains registry-backed namespace. No seed phrase,
  registry credential, or private DNS material is required or collected.

## Product

- Purpose: give the `.agent` root a distinctive native home and showcase public
  SLD identities in the namespace.
- Audience: agent owners, builders, curious visitors, and software agents.
- Primary takeaway: `.agent` is a persistent, portable, machine-readable name
  for an agent.
- Primary action: search for a `.agent` name through HeadlessDomains.com.
- Character: precise, alive, technical, and credible; aligned with the current
  Headless Domains dark-grid and green identity, with a restrained echo of the
  older neon site.
- Essential behavior: static content, registration search handoff, public SLD
  showcase, directory links, semantic and narrow-screen layouts.
- Explicit non-goals: no registry dashboard, account state, checkout, customer
  DNS, SLD registration logic, SkyInclude credential, or dynamic backend.

## Source and runtime

- Repository owner/name: `shadstoneofficial/agent-apex-site`
- Runtime: static HTML, CSS, JSON, and minimal JavaScript.
- Public data source: the read-only Headless Domains Agents directory API.
- Preview reference: `https://agent-tld.netlify.app/` (design history only).
- Canonical native production identity: `https://agent/`.
- Intended production host: not selected in this source-only phase; placement
  requires a current read-only host capacity audit.

## Registry classification

- Mode: **registry-backed TLD apex**.
- Registry/control plane: HeadlessDomains.com and `registry-dash`.
- DNS write backend: SkyInclude.
- Authority boundary: SkyInclude remains authoritative and continues to serve
  provider-managed DNSSEC and SLD/customer-zone behavior. This site is an
  independent static web release only.
- Production invariants: no Bob Wallet resource change; no replacement NS,
  GLUE, DS, KSK, or ZSK; no competing Knot/BIND zone; no pricing, staking,
  reserved-name, registrant, renewal, customer-zone, or SLD delegation change.
