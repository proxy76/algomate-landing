# Installing the deploy script — literal steps

Run these in order on the server. **Copy them exactly.** Every step says what
you should see; if you see something else, stop and report it rather than
improvising. Nothing here is reversible-by-guesswork, but every step has a
rollback at the bottom.

This is a one-time setup. After it, deploying is a single command (step 9).

---

## 0. Confirm where the checkout actually is

The scripts default to `/srv/algomate`, inferred from the live nginx `root`.
Confirm before trusting it:

```bash
ls -d /srv/algomate/frontend/package.json
```

Expected: the path prints. If it errors, find the real one:

```bash
sudo find /srv /var/www /opt -maxdepth 4 -name package.json -path '*frontend*' 2>/dev/null
```

If the checkout is somewhere else, substitute that path for `/srv/algomate`
**everywhere below**, and pass it to the script as `REPO=/real/path`.

---

## 1. Get the latest code

```bash
cd /srv/algomate
git pull --ff-only origin main
git log --oneline -1
```

Expected: a commit from 2026-08-18 or later.

---

## 2. Note which user owns the site

```bash
stat -c '%U' /srv/algomate/frontend/dist
```

Write down what it prints — call it `<OWNER>` below. Run the build as that
user, not as root, or the next build will hit permission errors.

---

## 3. Create the deploy directory

```bash
sudo mkdir -p /srv/algomate-deploy/bin /srv/algomate-deploy/releases
sudo chown -R <OWNER>:<OWNER> /srv/algomate-deploy
```

---

## 4. Install the script

```bash
sudo install -o <OWNER> -g <OWNER> -m 750 \
  /srv/algomate/deploy/rebuild.sh \
  /srv/algomate-deploy/bin/rebuild.sh
```

A copy, deliberately — it must not live inside the checkout it rewrites.

---

## 5. Run it once, before touching nginx

```bash
sudo -u <OWNER> /srv/algomate-deploy/bin/rebuild.sh
```

Expected: it prints `repo=... branch=main deploy_root=...`, runs the build,
then `published <timestamp>` and `rebuild ok`.

If it dies in preflight, the message says exactly what to fix. Fix that and
re-run. **Do not continue to step 6 until this succeeds** — the nginx change
depends on `/srv/algomate-deploy/current` existing.

Confirm it does:

```bash
ls -l /srv/algomate-deploy/current
ls /srv/algomate-deploy/current/index.html
```

Expected: a symlink pointing into `releases/`, and the file exists.

The site is still being served from the old path at this point. Nothing has
changed for visitors yet.

---

## 6. Back up the nginx config

```bash
sudo cp /etc/nginx/sites-available/algomate /root/algomate.nginx.$(date +%F).bak
ls -l /root/algomate.nginx.*.bak
```

Do not skip this.

---

## 7. Point nginx at the symlink

Edit `/etc/nginx/sites-available/algomate` and change exactly one line:

```nginx
    root /srv/algomate/frontend/dist;      # ← old
    root /srv/algomate-deploy/current;     # ← new
```

Change **nothing else**. Leave `listen`, `server_name`, `absolute_redirect`,
`port_in_redirect`, the `location /` block and the whole `/api/` proxy alone.

Then:

```bash
sudo nginx -t
```

Expected: `syntax is ok` and `test is successful`. If not, restore the backup
and stop.

```bash
sudo systemctl reload nginx
```

---

## 8. Verify

```bash
node /srv/algomate/frontend/scripts/check-live-seo.mjs https://algomate.ro
```

Expected: **`All checks passed`** and exit 0.

Then check the form still works, which the script does not cover:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://algomate.ro/api/contact/
```

Expected: `405` — the endpoint is POST-only, so 405 means the proxy is intact.
A `502` or `504` means the proxy broke: restore the backup and stop.

Both new posts should now be live:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://algomate.ro/blog/calendar-examene-2027
```

Expected: `200`.

---

## 9. From now on, deploying is one command

```bash
sudo -u <OWNER> /srv/algomate-deploy/bin/rebuild.sh
node /srv/algomate/frontend/scripts/check-live-seo.mjs https://algomate.ro
```

No nginx reload, no downtime, no window where the site is half-built.

---

## Rollback

**If nginx broke** (step 7 or 8 failed):

```bash
sudo cp /root/algomate.nginx.<date>.bak /etc/nginx/sites-available/algomate
sudo nginx -t && sudo systemctl reload nginx
```

That puts the site back on the old path exactly as it was.

**If a deploy published a bad build**, switch back to the previous release —
no rebuild needed:

```bash
ls -1dt /srv/algomate-deploy/releases/*/
ln -sfn /srv/algomate-deploy/releases/<stamp> /srv/algomate-deploy/current.tmp
mv -Tf  /srv/algomate-deploy/current.tmp     /srv/algomate-deploy/current
```

---

## What not to do

- **Do not add an SPA fallback** (`try_files $uri /index.html`). It looks right
  for a React site and is wrong here — the site is prerendered, and it makes
  every unknown URL return 200 with the homepage, which Google reads as a soft
  404. See SERVER-SETUP §4.3.2.
- **Do not remove `absolute_redirect off`.** It is what stops nginx emitting
  `http://algomate.ro:8080/...` in redirects. See §4.3.1.
- **Do not set up a systemd timer.** Post scheduling was dropped (§3.1).
- **Do not run the build as root.** It leaves root-owned files that break the
  next run as `<OWNER>`.
