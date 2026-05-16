# Custom domain setup

GitHub Pages supports custom domains for free. If you want the site at
`https://visitsudan.com/` (or any apex/subdomain), do this:

## 1. Buy or pick the domain

Use any registrar — Namecheap, Cloudflare, Porkbun, Google Domains, etc.

## 2. Tell GitHub the domain

Open repo **Settings → Pages → Custom domain**, type your domain, save.
GitHub will create a `CNAME` file at the root of your `gh-pages` artifact
automatically.

## 3. Tell the domain about GitHub

In your registrar's DNS settings:

### Apex domain (e.g. `visitsudan.com`)

Create four `A` records pointing the apex at GitHub's Pages anycast IPs:

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

…and an `AAAA` set for IPv6:

```
AAAA @    2606:50c0:8000::153
AAAA @    2606:50c0:8001::153
AAAA @    2606:50c0:8002::153
AAAA @    2606:50c0:8003::153
```

### Subdomain (e.g. `visit.example.com`)

A single `CNAME` record:

```
CNAME visit  jafarema.github.io.
```

## 4. Wait for HTTPS

GitHub will provision a TLS certificate automatically (a few minutes to a
few hours). When the **Enforce HTTPS** checkbox in Settings → Pages is
clickable, click it.

## 5. Update the site

Update these places to your new domain (search-and-replace
`https://jafarema.github.io/visit-sudan/`):

- `visit-sudan/index.html` — `<link rel="canonical">`, all `og:*` and
  `twitter:*` URLs, the JSON-LD `@id` and `url` fields.
- `visit-sudan/public/sitemap.xml` — the `<loc>` value.
- `visit-sudan/public/robots.txt` — the `Sitemap:` line.

That is the only code change needed. The site itself is path-agnostic
(`base: "./"` in `vite.config.js`).
