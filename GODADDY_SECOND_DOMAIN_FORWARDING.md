# GoDaddy — Point gorillatool.com.au to the same site (Forwarding)

Goal: when someone types **gorillatool.com.au**, they see the same site as
**www.gorillatool.au** (the GitHub Pages site).

## Why forwarding (not a second custom domain)

GitHub Pages allows **only ONE custom domain per repo** (the `CNAME` file holds one
name). So the second domain cannot be attached to the same repo. Instead we make
GoDaddy **301-redirect** `gorillatool.com.au` → `https://www.gorillatool.au`.

Result: visitor typing `.com.au` lands on the `.au` site; the address bar changes to
`www.gorillatool.au`. One canonical site, best for SEO, no double maintenance.

- **Primary / canonical domain:** `www.gorillatool.au`  (unchanged — do nothing here)
- **This guide sets up:** `gorillatool.com.au` → forward to primary

---

## Steps on GoDaddy

### 1. Open the domain
1. Log in **https://dcc.godaddy.com/** → avatar → **My Products**.
2. Find **gorillatool.com.au** → click **DNS** (or **…** → **Manage DNS**).

### 2. Clear conflicting records first
On `gorillatool.com.au`'s DNS page, **remove** anything that would fight the forward:
- Any **A** record with Name **`@`** (old parking / host).
- Any **CNAME** with Name **`www`** (old host).
- Leave **MX / TXT / NS** alone (email + registrar — not web hosting).

> If forwarding is added while an `@` A-record exists, the redirect silently fails.
> Clearing `@` A and `www` CNAME first avoids that.

### 3. Add the forwarding
1. Scroll to the **Forwarding** section (may be under **DNS** page bottom, or
   Domain Settings → **Forwarding**). Click **Add Forwarding** / **Set up**.
2. Configure:
   - **Forward from:** `gorillatool.com.au` (and tick "forward www" / both if offered)
   - **Forward to:** `https://www.gorillatool.au`
   - **Redirect type:** **Permanent (301)**
   - **Masking / Frame:** **OFF**  (masking breaks HTTPS + SEO — must be off)
3. **Save.** GoDaddy auto-creates the records it needs (a parked A + `_domainconnect`).

### 4. Cover the www side too
If GoDaddy did not auto-add it, also forward the `www` host:
- **Forward from:** `www.gorillatool.com.au` → **Forward to:** `https://www.gorillatool.au`
  (301, no masking).
Some GoDaddy UIs do apex + www in one toggle ("Forward both"). Use that if present.

---

## Verify (after ~15–30 min propagation)

| Type in browser | Expected |
|-----------------|----------|
| `http://gorillatool.com.au`      | redirects to `https://www.gorillatool.au` |
| `https://gorillatool.com.au`     | redirects to `https://www.gorillatool.au` |
| `http://www.gorillatool.com.au`  | redirects to `https://www.gorillatool.au` |

Command-line check (optional):
```
curl -I http://gorillatool.com.au
# look for: HTTP/1.1 301  and  Location: https://www.gorillatool.au
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Not redirecting | Old `@` A-record still present — delete it (Step 2), wait 30 min. |
| Shows "Not secure" / cert warning on `.com.au` | GoDaddy 301 hop over http is normal; final page is https on `.au`. Only worry if the **final** URL warns. |
| Redirect keeps `.com.au` in the URL | Masking is ON — turn it OFF. |
| Wants an SSL cert for `.com.au` itself | Not needed for a 301 forward. Skip unless you later choose Option B (separate site). |
| Forwarding option missing in UI | GoDaddy sometimes hides it until nameservers are GoDaddy default. Ensure NS = GoDaddy, not old host. |

---

## If you later want BOTH URLs to stay in the address bar (Option B)

Forwarding (this guide) is Option A — one canonical site. If instead you want
`gorillatool.com.au` to be its own live site (URL stays `.com.au`), that needs a
**second repo** with its own `CNAME` = `www.gorillatool.com.au` and the same files,
plus the four A-records + `www` CNAME on `.com.au` (same as the main DNS guide).
Downside: two repos to keep in sync. Ask me to set that up if you change your mind.

---

## Reference

- Primary site repo: `https://github.com/tshenjoy/gorillatool`
- Primary domain: `www.gorillatool.au`
- This forward: `gorillatool.com.au` → `https://www.gorillatool.au` (301, no mask)
