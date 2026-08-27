# EmailJS Setup Guide for StarlandMech

This guide explains how to enable email functionality for the contact forms on your website.

---

## Overview

The website uses **EmailJS** to send emails directly from the browser without needing a backend server. This works perfectly with GitHub Pages hosting.

**Free Tier Limits:** 200 emails/month, 2 email templates

---

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **Sign Up** (free account)
3. Verify your email address

---

## Step 2: Add an Email Service

1. Go to **Dashboard → Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Custom SMTP** (for business email)
4. Follow the connection steps (usually involves OAuth login)
5. **Save your Service ID** (looks like: `service_abc123`)

---

## Step 3: Create Email Templates

You need **2 templates** - one for quote requests, one for newsletter signups.

### Template 1: Quote Request

1. Go to **Dashboard → Email Templates**
2. Click **Create New Template**
3. Configure:

   **Template Name:** `Quote Request`

   **Subject:**
   ```
   New Quote Request from {{name}}
   ```

   **Content:**
   ```
   New quote request received from the website:

   Name: {{name}}
   Email: {{email}}
   Company: {{company}}
   Contact: {{contact}}

   Message:
   {{message}}

   ---
   Sent from StarlandMech website contact form
   ```

4. Set **To Email** to your business email address
5. Click **Save**
6. **Save your Template ID** (looks like: `template_quote123`)

### Template 2: Newsletter Subscription

1. Click **Create New Template**
2. Configure:

   **Template Name:** `Newsletter Signup`

   **Subject:**
   ```
   New Newsletter Subscription from {{name}}
   ```

   **Content:**
   ```
   New newsletter subscription:

   Name: {{name}}
   Email: {{email}}
   Company: {{company}}

   ---
   Sent from StarlandMech website
   ```

3. Set **To Email** to your business email address
4. Click **Save**
5. **Save your Template ID** (looks like: `template_news456`)

---

## Step 4: Get Your Public Key

1. Go to **Dashboard → Account → General**
2. Find **Public Key** section
3. **Copy your Public Key** (looks like: `AbCdEfGhIjKlMnOp`)

---

## Step 5: Update Your Website Code

Open the file: `assets/js/main.js`

Find this section near the top (around lines 60-66):

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '-0Ytnb58lg5DEuhGY',
    SERVICE_ID: 'service_bldx9hm',
    QUOTE_TEMPLATE_ID: 'template_ez29iok',
    NEWSLETTER_TEMPLATE_ID: 'template_d3c6y4h'
};
```

✅ **CONFIGURED** - The EmailJS credentials have been set up in `assets/js/main.js`

---

## Step 6: Test It

1. Deploy your updated code to GitHub Pages
2. Open your website
3. Click "Get Started" or any contact button
4. Fill out the form and submit
5. Check your email inbox

---

## Troubleshooting

### "EmailJS not configured" alert
- Make sure you replaced all 4 placeholder values in `main.js`
- Check for typos in your IDs

### Emails not arriving
- Check your spam/junk folder
- Verify your email service is connected (Dashboard → Email Services → check status)
- Check EmailJS Dashboard → Email History for errors

### Form shows error after submitting
- Open browser console (F12 → Console tab) for detailed error
- Verify your Template IDs match exactly
- Make sure template variable names match: `{{name}}`, `{{email}}`, `{{company}}`, `{{contact}}`, `{{message}}`

---

## Template Variables Reference

These variables are sent from the website forms:

### Quote Form Variables
| Variable    | Description                    |
|-------------|--------------------------------|
| `{{name}}`    | Customer's name              |
| `{{email}}`   | Customer's email             |
| `{{company}}` | Company name                 |
| `{{contact}}` | Phone/WhatsApp (optional)    |
| `{{message}}` | Customer's message (optional)|

### Newsletter Form Variables
| Variable    | Description                    |
|-------------|--------------------------------|
| `{{name}}`    | Subscriber's name            |
| `{{email}}`   | Subscriber's email           |
| `{{company}}` | Company name (optional)      |

---

## Upgrading EmailJS Plan

If you exceed 200 emails/month, you can upgrade at:
https://www.emailjs.com/pricing/

---

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/contact/

---
---

# GitHub Pages Deployment Guide

This section covers deploying your website to GitHub Pages and updating SEO-related URLs.

---

## Step 1: Create GitHub Repository

1. Go to **https://github.com** and sign in
2. Click **New repository** (+ icon → New repository)
3. Name it: `starlandmech` (or your preferred name)
4. Set to **Public** (required for free GitHub Pages)
5. Click **Create repository**

---

## Step 2: Push Your Code

Run these commands in your project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/starlandmech.git
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**
6. Wait 1-2 minutes for deployment

Your site will be live at: `https://YOUR_USERNAME.github.io/starlandmech/`

---

## Step 4: Update SEO URLs (IMPORTANT)

The SEO files currently use placeholder domain `https://starlandmech.com/`. You need to update these to match your actual deployment URL.

### Option A: Using GitHub Pages Default URL

If your site is at `https://YOUR_USERNAME.github.io/starlandmech/`:

**Files to update:**

1. **`sitemap.xml`** - Replace all URLs:
   ```
   Find:    https://starlandmech.com/
   Replace: https://YOUR_USERNAME.github.io/starlandmech/
   ```

2. **`robots.txt`** - Update sitemap location:
   ```
   Sitemap: https://YOUR_USERNAME.github.io/starlandmech/sitemap.xml
   ```

3. **All HTML files** - Update canonical URLs and Open Graph URLs:
   - `index.html`
   - `pages/services.html`
   - `pages/products.html`
   - `pages/about.html`
   - `pages/contact.html`
   - `pages/diamond-core-drill.html`
   - `pages/drill-stand.html`
   - `pages/floor-grinder.html`

   In each file, find and replace:
   ```
   https://starlandmech.com/ → https://YOUR_USERNAME.github.io/starlandmech/
   ```

### Option B: Using Custom Domain

If you have a custom domain (e.g., `starlandmech.com`):

1. **Configure custom domain in GitHub:**
   - Go to repository **Settings** → **Pages**
   - Enter your domain in "Custom domain" field
   - Check "Enforce HTTPS"

2. **Configure DNS (at your domain registrar):**

   For apex domain (`starlandmech.com`):
   ```
   Type: A
   Host: @
   Points to:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   ```

   For www subdomain:
   ```
   Type: CNAME
   Host: www
   Points to: YOUR_USERNAME.github.io
   ```

3. **No URL changes needed** - The SEO files already use `starlandmech.com`

---

## Step 5: Submit to Search Engines

After deployment, submit your sitemap to search engines:

### Google Search Console
1. Go to https://search.google.com/search-console/
2. Add your property (URL prefix method)
3. Verify ownership (HTML file or DNS)
4. Go to **Sitemaps** → Enter `sitemap.xml` → Submit

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters/
2. Add your site
3. Submit sitemap URL

---

## Quick Reference: Files with URLs to Update

| File | URLs to Update |
|------|----------------|
| `sitemap.xml` | All `<loc>` entries |
| `robots.txt` | `Sitemap:` line |
| `index.html` | `canonical`, `og:url`, `og:image`, `twitter:image`, structured data |
| `pages/*.html` | `canonical`, `og:url`, `og:image`, `twitter:image` |

---

## Testing Your SEO

After deployment, test your setup:

1. **Google Rich Results Test:** https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
4. **Sitemap Validator:** https://www.xml-sitemaps.com/validate-xml-sitemap.html

---
---

# GitHub Pages Final Configuration

**Status:** DNS configured on GoDaddy ✅ | CNAME file created ✅ | GitHub Pages pending ⏳

---

## What's Already Done

- [x] DNS A records added on GoDaddy (4 records pointing to GitHub IPs)
- [x] DNS CNAME record added on GoDaddy (`www` → `tshenjoy.github.io`)
- [x] `CNAME` file created in project root (contains `www.starlandmech.com`)
- [x] SEO files configured with `starlandmech.com` URLs
- [ ] **GitHub Pages enabled** ← DO THIS WHEN READY

---

## Final Step: Enable GitHub Pages

When you have access to configure GitHub Pages, do this:

### 1. Go to Repository Settings

1. Open: `https://github.com/tshenjoy/tshenjoy.github.io_starlandmech`
   (or whatever your repository URL is)
2. Click **Settings** (tab near the top)
3. In the left sidebar, click **Pages**

### 2. Configure Build and Deployment

Under **"Build and deployment"**:
- **Source:** Select `Deploy from a branch`
- **Branch:** Select `main` and `/ (root)`
- Click **Save**

### 3. Configure Custom Domain

Under **"Custom domain"**:
- Enter: `www.starlandmech.com`
- Click **Save**
- Wait for DNS check (shows "DNS check in progress...")
- Once DNS check passes, check **"Enforce HTTPS"**

### 4. Wait for Deployment

- GitHub will build and deploy your site (1-2 minutes)
- A green checkmark will appear when ready

---

## Verify It Works

After completing the steps above, test these URLs:

| URL | Expected Result |
|-----|-----------------|
| `https://www.starlandmech.com` | Your website loads ✅ |
| `https://starlandmech.com` | Redirects to www version |
| `http://starlandmech.com` | Redirects to HTTPS |

---

## Troubleshooting

### "DNS check unsuccessful"
- DNS can take up to 24 hours to propagate (usually 15-30 min)
- Check DNS status at: https://dnschecker.org/#A/starlandmech.com
- Try again later

### Site shows 404
- Verify `index.html` is in root folder
- Check branch is set to `main`
- Wait a few minutes and refresh

### Certificate/HTTPS error
- Wait 15-30 minutes after enabling for SSL certificate
- Make sure "Enforce HTTPS" is checked

### "Domain already taken"
- Remove domain from any other GitHub repos first

---

## DNS Records Reference (Configured on GoDaddy)

```
Type: A     | Host: @   | Value: 185.199.108.153
Type: A     | Host: @   | Value: 185.199.109.153
Type: A     | Host: @   | Value: 185.199.110.153
Type: A     | Host: @   | Value: 185.199.111.153
Type: CNAME | Host: www | Value: tshenjoy.github.io
```

---

## Quick Checklist

When you're ready to configure GitHub Pages:

- [ ] Go to repository Settings → Pages
- [ ] Set Source: Deploy from branch
- [ ] Set Branch: main, / (root)
- [ ] Enter custom domain: `www.starlandmech.com`
- [ ] Wait for DNS check to pass
- [ ] Enable "Enforce HTTPS"
- [ ] Test: `https://www.starlandmech.com`
