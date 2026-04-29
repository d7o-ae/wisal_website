# Google Services Setup Guide

This guide will help you integrate Google Analytics, Google Search Console, and PageSpeed Insights into your Wisal website.

## 1. Google Analytics 4 (GA4)

### Step 1: Create a GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Click **+ Create Property**
4. Enter property details (Property name: "Wisal Website")
5. Choose your reporting timezone and currency
6. Click **Next** → Select your business category and size
7. Click **Create** and accept Terms of Service

### Step 2: Get Your Measurement ID
1. In Admin → Property → Data Streams
2. Click **Add stream** → **Web**
3. Enter your website URL (e.g., `https://wisal.app`)
4. Click **Create stream**
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Configure Your Website
1. Open `src/utils/analytics.ts`
2. Replace `'G-XXXXXXXXXX'` with your actual Measurement ID
3. Install the package:
   ```bash
   npm install react-ga4
   ```
4. Deploy your website

### Step 4: Verify Installation
1. Go back to GA4 → Data Streams → Your stream
2. Click **View tag instructions**
3. Test with Google Analytics Debugger or wait 24-48 hours for data

---

## 2. Google Search Console

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click **Add Property**
3. Choose **URL prefix** and enter your website URL (e.g., `https://wisal.app`)

### Step 2: Verify Ownership (Choose ONE method)

#### Option A: HTML Meta Tag (Recommended for React)
1. GSC will provide a meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
2. Add this to `index.html` in the `<head>` section (already done below)
3. Deploy your website
4. Return to GSC and click **Verify**

#### Option B: HTML File Upload
1. Download the verification file from GSC
2. Place it in your `public/` folder
3. Deploy and verify

#### Option C: Google Analytics (if GA4 is already set up)
1. If you've already set up GA4 with the same Google account
2. GSC can verify automatically through GA

### Step 3: Submit Sitemap
1. After verification, generate a sitemap (see instructions below)
2. In GSC, go to **Sitemaps** (left sidebar)
3. Enter your sitemap URL: `https://yourwebsite.com/sitemap.xml`
4. Click **Submit**

---

## 3. PageSpeed Insights

PageSpeed Insights is a **testing tool**, not something you "connect" to your website.

### How to Use:
1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your website URL
3. Click **Analyze**
4. Review performance scores and recommendations

### Automated Monitoring (Optional):
- Use **Google Lighthouse CI** in your deployment pipeline
- Use **Google Search Console** → Core Web Vitals section (automatically tracks your site's performance)
- Install Lighthouse Chrome extension for local testing

---

## 4. Additional Setup Required

### Create a Sitemap
Add a sitemap generator to help search engines index your site:

```bash
npm install --save-dev vite-plugin-sitemap
```

Update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://yourwebsite.com', // Replace with your domain
      dynamicRoutes: [
        '/',
        // Add any other routes
      ],
    }),
  ],
});
```

### Add robots.txt
Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourwebsite.com/sitemap.xml
```

---

## 5. Environment Variables (Optional)

For better security, store your GA4 Measurement ID in environment variables:

1. Create `.env` file:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. Update `src/utils/analytics.ts`:
   ```typescript
   const TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
   ```

3. Add `.env` to `.gitignore` (keep your IDs secret)

---

## Quick Checklist

- [ ] Set up GA4 property and get Measurement ID
- [ ] Install `react-ga4` package
- [ ] Update Measurement ID in `src/utils/analytics.ts`
- [ ] Add Google Search Console verification meta tag to `index.html`
- [ ] Deploy website
- [ ] Verify ownership in Google Search Console
- [ ] Generate and submit sitemap to GSC
- [ ] Test PageSpeed Insights
- [ ] Monitor data in GA4 and GSC dashboards

---

## Useful Links

- [Google Analytics 4](https://analytics.google.com/)
- [Google Search Console](https://search.google.com/search-console/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [react-ga4 Documentation](https://github.com/PriceRunner/react-ga4)
