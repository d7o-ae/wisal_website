# Security Fix: Firebase API Key Leak

## ⚠️ IMPORTANT: Regenerate Your Firebase API Key

Your Firebase API key was exposed in the Git history. Follow these steps:

### 1. Regenerate Firebase Web API Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **wisal-5d1e5**
3. Go to **Project Settings** (⚙️ icon)
4. Scroll to **Your apps** section
5. Find your web app and click **Register new app** OR
6. For existing app, click the **Config** icon and regenerate credentials

### 2. Update Your Local .env File

The `.env` file is now in your project root with your current credentials. When you get new credentials:

1. Open `.env` file
2. Replace `VITE_FIREBASE_API_KEY` with your new API key
3. Save the file

### 3. Commit the Changes

```bash
git add .gitignore src/firebase/config.ts .env.example
git commit -m "fix: move Firebase config to environment variables"
git push
```

**Note:** The `.env` file is now in `.gitignore` and won't be committed.

### 4. Close GitHub Alert

1. Go to your GitHub repository
2. Navigate to **Security** > **Secret scanning alerts**
3. Mark the alert as **Revoked**

### 5. Optional: Restrict API Key

To further secure your API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** > **Credentials**
4. Find your API key
5. Click **Edit**
6. Under **Application restrictions**, select **HTTP referrers**
7. Add your domains:
   - `localhost:5173` (for development)
   - Your production domain (e.g., `yourdomain.com`)

## How It Works Now

- Environment variables are stored in `.env` (not committed)
- Vite loads them using `import.meta.env.VITE_*`
- `.env.example` provides a template for other developers
- `.gitignore` prevents `.env` from being committed

## For Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard
2. Use the same variable names from `.env.example`
3. Fill in your actual values

Your app is now secure! 🔒
