# Security — audit record and standing rules

**Audience:** an agent or developer working on this repo or this server, with
no context from the session that produced this file.

**Written:** 2026-11-12, from an audit of `main` at `7896e28` (tagged
`pre-audit-2026-11-12`), the live nginx/systemd configuration, and
`https://algomate.ro` as served. Everything marked **Fixed** is live and was
verified in production: the backend and the frontend release went out on
2026-11-12 (21:40 UTC), the nginx configuration and the tunnel change early on
2026-11-13 UTC. Verification was `check-live-seo.mjs` (78 checks), a browser
run of every route under the enforced CSP, the backend log showing a real
client address for a request through Cloudflare, and one labelled test
enrolment that arrived by email.

The companion documents are `docs/SERVER-SETUP.md` (infrastructure) and
`deploy/nginx/algomate.conf.example` (the live nginx config, with the reason
for every directive). This file is the *why* and the *what is left*.

---

## 0. The shape of the system, in one paragraph

A static, prerendered site served by nginx on `127.0.0.1:8080`. The public
side is Cloudflare, which terminates TLS and reaches nginx through a
`cloudflared` tunnel — nothing on this box listens on a public interface for
this site. The only dynamic code is one Django endpoint, `POST /api/contact/`,
which emails the enrolment form to the owner. There are no accounts, no
sessions, no cookies and no database content. The realistic threats are
therefore: abuse of the form, a hostile or compromised dependency in the build,
markup injected into a post, a leaked secret, and anything that lets a visitor
be served something other than what was deployed.

---

## 1. Findings

Severity is for *this* site: what an attacker could actually do with it.

### S-1 (High) — the form's rate limit was one bucket for the whole internet — Fixed

`POST /api/contact/` is throttled at 5 requests an hour "per address". But
every request reaches nginx from the tunnel on loopback, nginx forwarded *its
peer's* address, and so Django saw `127.0.0.1` for every visitor: sixty days of
gunicorn logs show no other client address. Consequences:

- five submissions in an hour **from anyone** locked the form for everybody,
  with a 429 the site reports as "you have reached the limit";
- throttling runs before validation, so five junk POSTs from one script did
  the same — a one-line way to switch off the business's only lead channel;
- conversely the limit did nothing against a single abuser.

**Fix.** nginx restores the visitor's address from Cloudflare's
`CF-Connecting-IP` (`set_real_ip_from 127.0.0.1; real_ip_header …`) and
overwrites `X-Forwarded-For` with it; Django takes exactly that hop
(`NUM_PROXIES = 1`). `backend/core/tests.py` has the regression tests
(`test_throttle_is_per_visitor_not_global`, `test_client_cannot_pick_its_own_bucket`).
GET requests no longer count, so health probes cannot exhaust the allowance.

**Trust note.** `CF-Connecting-IP` is believed only because nginx listens on
loopback and nothing but the tunnel can reach it. If the server block ever gets
a public listener, replace `127.0.0.1` with Cloudflare's published ranges.

### S-2 (High) — plain HTTP was served, not redirected — Fixed

`http://algomate.ro/` answered `200` with the full site. Cloudflare accepts
port 80 and forwards it through the tunnel like any other request; "Always Use
HTTPS" is off in the zone. Anyone on the network path of a visitor who typed
the bare domain could read or rewrite the page — including the enrolment form
and where it posts.

**Fix.** nginx redirects when the tunnel reports `X-Forwarded-Proto: http`,
and sends `Strict-Transport-Security: max-age=31536000` so a browser that has
visited once never tries HTTP again. HSTS is deliberately *without*
`includeSubDomains` and `preload` — see §3.

### S-3 (Medium) — no security headers on the site — Fixed

The static pages were served with no `Content-Security-Policy`, no
`X-Frame-Options`, no `X-Content-Type-Options`, no `Referrer-Policy`. The page
could be framed (clickjacking the form), and nothing stood behind the
build-time sanitiser if a post ever carried script.

**Fix.** All set at server level in nginx with `always`. The CSP allows script
only from the site itself — no inline script, no eval — which is possible
because the fonts are now self-hosted and there is no third-party request left
on any page. `style-src` keeps `'unsafe-inline'`: KaTeX output and the
prerendered animation states are inline `style` attributes.

**Standing rule.** Adding any third-party script, font, iframe or image host
means editing the CSP in `deploy/nginx/algomate.conf.example` *and* on the
server, or the browser will silently refuse it. Check the console.
`static.cloudflareinsights.com` is pre-allowed so that enabling Cloudflare Web
Analytics does not need a config change.

### S-4 (Medium) — secrets readable by every local user — Fixed (rotation is the owner's)

- `backend/.env` (Django `SECRET_KEY`, the Gmail **app password**) was mode
  `664`: world-readable. Now `600`. `backend/.env.example` documents this.
- The Cloudflare **tunnel token** was on the command line of
  `cloudflared.service` — in a world-readable unit file and in `ps` for every
  process on the box. Whoever holds that token can run their own connector for
  the tunnel and receive a share of algomate.ro's traffic. It is now read
  from `/etc/cloudflared/algomate-tunnel.token` (root, `600`) with
  `--token-file`; the previous unit is kept beside it as
  `cloudflared.service.bak-20261112` (also `600` — it still contains the old
  token; delete it once the token has been rotated). The switch was made with
  a temporary second connector running, so the site stayed up throughout.

This box also runs other services, including one that exists to execute
visitors' code. "Any local user" is not a hypothetical audience.

**Still to do — owner.** Moving a secret does not un-leak it. Rotate both:
the tunnel token (Cloudflare Zero Trust → Networks → Tunnels → the tunnel →
*Refresh token*, then put the new value in that file and
`systemctl restart cloudflared`),
and the Gmail app password (Google Account → Security → App passwords; update
`backend/.env`, `systemctl restart algomate`).

### S-5 (Medium) — 26 npm advisories, one critical — Fixed

`react-router`, `vite`, `rollup`, `axios`, `zod`, `qs` and others. All fixable
inside the declared semver ranges; `axios` was removed outright in favour of
`fetch`. **Remaining:** 7 moderate, all one `minimatch` ReDoS inside
`typescript-eslint` — lint tooling, never shipped and never run by a deploy.
Its fix is a breaking major; do it as a deliberate lint upgrade.

Django `6.0.1 → 6.0.10` (patch releases, several of them security releases).
`gunicorn` was running unpinned and is now in `requirements.txt`.

### S-6 (Low) — header injection via the name field surfaced as a 500 — Fixed

The visitor's name goes into the email `Subject`. Django refuses a subject
containing a line break — as an unhandled `BadHeaderError`, i.e. a 500. Not
exploitable, but an error an attacker can trigger at will. The serializer now
rejects control characters as a 400; the phone check no longer accepts
non-ASCII digits. The notification gained `Reply-To`, validated as a single
address by `EmailField`.

### S-7 (Low) — the browsable API and form parsers were enabled — Fixed

DRF defaults: `/api/contact/` rendered an HTML API browser to browsers and
parsed multipart/form bodies. JSON-only now.

### S-8 (Low) — dotfiles were served — Fixed

`/blog/.gitkeep` returned 200. Harmless itself; the same path would have
served a stray `.env`. nginx now 404s every dot-path except `/.well-known/`.

### S-9 (Low) — the backend ran unsandboxed — Fixed

`algomate.service` had no hardening: a compromise of the one process that
parses internet input and holds a mail password had the run of `razvan`'s
files. `deploy/systemd/algomate.service` now runs it with a read-only
filesystem, no `/home`, no capabilities and no new privileges.

### S-10 (Low) — the full form had no honeypot — Fixed

`/inscriere` sent `website: ''` hard-coded; only the homepage's quick form had
the field. Both have it now.

### S-11 (Info) — external-link detection in the post sanitiser — Fixed

`href.includes('algomate.ro')` treated `https://elsewhere/?ref=algomate.ro` as
internal, so it lost `rel="noopener noreferrer"`. Compares the hostname now.

### S-12 (Info) — nginx version in error pages — Fixed

`server_tokens off`, and the bare nginx 404 page is replaced by the site's own.

---

## 2. Checked and found sound — do not "fix"

- **Post HTML sanitisation** (`scripts/build-content.mjs`). Allow-list, no
  inline styles, no event handlers, KaTeX substituted *after* sanitising via a
  per-build random placeholder. This is correct and load-bearing. The CSP is a
  second layer, not a replacement.
- **`dangerouslySetInnerHTML`** is used for exactly two things: sanitised post
  HTML and `JSON.stringify`d JSON-LD from build-time constants.
- **CORS** is restricted to `https://algomate.ro`; there is no cookie or
  session for CSRF to ride on.
- **`DEBUG=False`, `ALLOWED_HOSTS=algomate.ro`**, secret key of adequate length.
- **SSH** is firewalled to the LAN (`ufw`: 22 from `192.168.0.0/16` only) and
  Tailscale; nothing but the tunnels faces the internet.
- **No secret is in git history** for `.env*` paths (both `.gitignore`s cover
  them and `git log --all -- '*.env'` is empty).
- **The IndexNow key** in `scripts/indexnow.mjs` and `public/<key>.txt` is
  public by design.

---

## 3. Decisions left to the owner

1. **Rotate the tunnel token and the Gmail app password** (S-4).
2. **Cloudflare → SSL/TLS → Edge Certificates → Always Use HTTPS: on.** nginx
   now redirects, but doing it at the edge saves the round trip through the
   tunnel and covers the case where nginx is down.
3. **`www.algomate.ro` does not resolve.** A visitor who types `www.` gets a
   DNS error. Add a proxied `www` record and a redirect rule to the apex.
4. **HSTS `includeSubDomains` / `preload`.** Not set: it would bind
   `python.`, `laborator.` and every future subdomain to HTTPS irreversibly.
   Worth doing once that is known to be true of all of them.
5. **The `claudeuser` account has sudo and a password equal to its name.** It
   is only reachable from the LAN and Tailscale, but any process on the box
   can `su` to it and then to root. Give it a real password or key-only sudo.
6. **Privacy policy.** It should name Cloudflare as a processor (it sees every
   visitor's IP address) and mention server access logs, which now record the
   visitor's address rather than `127.0.0.1`. Self-hosting the fonts removed
   the one undisclosed transfer (visitor IPs to Google Fonts).
7. **A CAPTCHA** (Cloudflare Turnstile is free and cookie-less) if form spam
   appears. Today the defences are the honeypot, the two rate limits and the
   nginx request limit; the "I am not a robot" checkbox is a formality.
8. **Backups.** The site is fully reproducible from git. What is *not* in git:
   `backend/.env`, `/etc/nginx/`, `/etc/systemd/system/algomate*`,
   `/etc/cloudflared/`. Keep a copy somewhere that is not this disk.

---

## 4. How to re-verify

```bash
# The live site: headers, HTTPS redirect, 404s, dotfiles, assets, the API
node frontend/scripts/check-live-seo.mjs https://algomate.ro

# The backend
cd backend && SECRET_KEY=test venv/bin/python manage.py test

# Dependencies
cd frontend && npm audit              # expect 7 moderate, all typescript-eslint
backend/venv/bin/pip list --outdated

# Secrets are not world-readable, and not on a command line
sudo stat -c '%a %n' backend/.env /etc/cloudflared/algomate-tunnel.token   # 600 600
ps -eo args | grep -c -- '--token'                                  # 0 (1 = the grep itself)
```

After any nginx change, also load a page in a browser with the console open:
a Content-Security-Policy violation is logged there and nowhere else.
