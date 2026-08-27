# GoDaddy DNS Setup — gorillatool.au → GitHub Pages

Goal: make **https://www.gorillatool.au** serve this site (hosted on GitHub Pages,
repo `tshenjoy/gorillatool`).

You own `gorillatool.au` on GoDaddy. GitHub hosts the files. DNS is the wiring
between the two. Do the steps below **once**; propagation then takes 15 min – 24 hr.

---

## Part A — What is already done (by the deploy scripts)

- [x] Repo created & pushed: `https://github.com/tshenjoy/gorillatool`
- [x] `CNAME` file in repo = `www.gorillatool.au`
- [x] GitHub Pages enabled (source: `main` / root)
- [x] Custom domain registered in Pages = `www.gorillatool.au`

You only need to do **Part B (GoDaddy DNS)** and **Part C (verify + HTTPS)**.

---

## Part B — Configure DNS on GoDaddy

### B1. Open the DNS editor
1. Log in at **https://dcc.godaddy.com/** (or godaddy.com → sign in).
2. Top-right avatar → **My Products**.
3. Find **gorillatool.au** → click the **DNS** button (or **…** → **Manage DNS**).
   You are now on the **DNS Records** page.

### B2. DELETE conflicting old records (IMPORTANT)
The old host / GoDaddy parking left records that will fight GitHub. Before adding,
**remove** any existing records of these kinds:

- Any **A** record with **Name `@`** (points apex to old server / GoDaddy park).
- Any **CNAME** record with **Name `www`** (old host or GoDaddy `_domainconnect`).
- Any **"Forwarding"** entry under Domain → **Forwarding** (turn OFF; forwarding
  injects a hidden A record that breaks Pages).

> Leave MX (email), TXT, and NS records alone — those are not web hosting.
> If unsure whether a record is email-related, keep it. Only touch `@` A-records,
> `www` CNAME, and forwarding.

### B3. ADD the four A records (apex → GitHub)
Click **Add New Record** four times. For each: Type **A**, Name **@**, TTL **1 hour**
(or 600 sec). Values:

```
Type: A   | Name: @  | Value: 185.199.108.153
Type: A   | Name: @  | Value: 185.199.109.153
Type: A   | Name: @  | Value: 185.199.110.153
Type: A   | Name: @  | Value: 185.199.111.153
```

These are GitHub Pages' load-balancer IPs (same for every Pages site). They make
`gorillatool.au` (no www) resolve to GitHub.

### B4. ADD the www CNAME (www → your GitHub user)
```
Type: CNAME | Name: www | Value: tshenjoy.github.io   | TTL: 1 hour
```

Note the value is **`tshenjoy.github.io`** (your GitHub username), **with a trailing
dot if GoDaddy requires FQDN** → `tshenjoy.github.io.`. NOT the repo name, NOT
`gorillatool`. This is the one people usually get wrong.

### B5. Save
Click **Save** on each record. Final record set should read:

```
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    tshenjoy.github.io
```

---

## Part C — Verify & enable HTTPS

### C1. Watch DNS propagate
- Check: **https://dnschecker.org/#A/gorillatool.au** (A records should show the
  four `185.199.x.153` IPs across regions).
- And: **https://dnschecker.org/#CNAME/www.gorillatool.au** → `tshenjoy.github.io`.
- Usually 15–30 min; can take up to 24 hr.

### C2. GitHub verifies the domain
1. Repo → **Settings** → **Pages**.
2. Under **Custom domain** it should show `www.gorillatool.au` with a green
   **DNS check successful** once B propagates. (If it shows an error, wait longer
   or recheck the CNAME value.)

### C3. Enable HTTPS
- Still on Settings → Pages, tick **Enforce HTTPS**.
- This box is greyed out until GitHub issues the TLS cert (can take 15 min – few hr
  after DNS verifies). Just wait, then tick it.

### C4. Final test
| URL | Expected |
|-----|----------|
| `https://www.gorillatool.au`  | site loads |
| `https://gorillatool.au`      | redirects to www |
| `http://gorillatool.au`       | upgrades to https |

---

## Troubleshooting

| Symptom | Cause / Fix |
|---------|-------------|
| Pages "DNS check unsuccessful" | Old `@` A-record or `www` CNAME still present, or forwarding ON. Recheck Part B2. |
| Site 404s | Wait for build; confirm `index.html` in repo root and branch = `main`. |
| "Domain already taken" in Pages | Same custom domain set on another repo. Remove it there first. |
| HTTPS box greyed out | Cert not issued yet. Wait, refresh. |
| Only apex works, not www (or vice-versa) | You added A records but forgot the `www` CNAME, or trailing-dot issue. |
| `.au` note | Some registrars restrict `.au` DNS editing to the account holder — you own it, so fine. |

---

## Quick reference — the 5 records

```
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    tshenjoy.github.io
```

Custom domain in GitHub Pages: `www.gorillatool.au`
Repo: `https://github.com/tshenjoy/gorillatool`
