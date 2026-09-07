# `.agent` apex site

A static, registry-safe website for the Handshake root `agent/`.

The site is deliberately independent from `registry-dash`, SkyInclude, and the
HeadlessDomains.com application. It reads no registry credentials and performs
no DNS writes. Its public identity showcase is generated only from the public
Headless Domains Agents directory API.

## Preview

```sh
python3 -m http.server 4173 --directory .
```

Open `http://localhost:4173`.

## Refresh the showcase

```sh
node scripts/update-showcase.mjs
```

This replaces `data/slds.json` with a small, presentation-safe subset of public
`.agent` directory profiles. Edit `data/showcase-domains.json` to curate which
approved names appear and their order. The scheduled GitHub workflow runs the
same script weekly and opens no connection to the registry or SkyInclude.

## Production boundary

This repository is only the static release source. Publishing it does not
authorize a production deployment or any provider-zone change. A native launch
must use the registry-backed TLD apex procedure: preserve the complete Bob
Wallet resource, SkyInclude authority and DNSSEC keys, every SLD/customer zone,
and all registry-dash behavior. Only narrowly approved apex web records may be
changed after a separately reviewed before/after diff.
