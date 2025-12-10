# 🚀 CodeSnip Deployment Guide

Complete step-by-step guide to deploy CodeSnip to production.

## 📋 Prerequisites

Before deployment, ensure you have:
- ✅ GitHub account
- ✅ Render account (for backend)
- ✅ Vercel account (for frontend)
- ✅ Neon account (for database)
- ✅ OpenAI API key (optional, for AI features)

---

## 🗄️ Part 1: Database Setup (Neon)

### Step 1: Create Neon Account
1. Go to [https://neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create new project: "codesnip-db"

### Step 2: Get Connection String
1. In project dashboard, click "Connection Details"
2. Copy the connection string (should look like):
   ```
   postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. Save this for later!

---

## 🔧 Part 2: Backend Deployment (Render)

### Step 1: Push Code to GitHub

```bash
# From your project root
git init
git add .
git commit -m "Initial commit: CodeSnip project"

# Create GitHub repo, then:
git remote add origin https://github.com/YOUR_USERNAME/codesnip.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Render

1. Go to [https://render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:

**Basic Settings:**
- Name: `codesnip-api`
- Region: Choose closest to you
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Node`

**Build Command:**
```bash
npm install && npx prisma generate && npx prisma migrate deploy
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
Click "Advanced" and add:

```
DATABASE_URL=your_neon_connection_string_here
JWT_SECRET=your_super_secret_random_string_here_minimum_32_characters
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
OPENAI_API_KEY=sk-your-openai-key-here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Generate JWT Secret:**
```bash
# Run this in your terminal to generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. Once deployed, copy your backend URL (e.g., `https://codesnip-api.onrender.com`)

### Step 3: Verify Backend

Test your API:
```bash
curl https://your-backend-url.onrender.com/health
```

Should return:
```json
{
  "success": true,
  "message": "CodeSnip API is running",
  "timestamp": "..."
}
```

---

## 🎨 Part 3: Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy Frontend

```bash
# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (Your account)
# - Link to existing project? No
# - What's your project name? codesnip
# - Which directory? ./
# - Want to override settings? No
```

### Step 3: Set Environment Variables

```bash
# Set production environment variable
vercel env add REACT_APP_API_URL production

# When prompted, enter your Render backend URL:
https://your-backend-url.onrender.com/api
```

### Step 4: Deploy to Production

```bash
vercel --prod
```

Your app will be live at: `https://codesnip-your-username.vercel.app`

### Step 5: Update Backend CORS

Go back to Render → Your Web Service → Environment
Update `FRONTEND_URL` to your Vercel URL:
```
FRONTEND_URL=https://codesnip-your-username.vercel.app
```

---

## ✅ Part 4: Verification & Testing

### Test Full Flow:

1. **Visit Your App**: `https://your-app.vercel.app`

2. **Register Account**:
   - Click "Sign up"
   - Enter email, username, password
   - Should redirect to dashboard

3. **Create Snippet**:
   - Click "New Snippet"
   - Add title, code, language
   - Click "Create"
   - Should appear in dashboard

4. **Test AI Features** (if OpenAI key added):
   - Create new snippet
   - Add code and title
   - Click "AI Suggestions"
   - Should get auto-tags and description

5. **Test Dark Mode**:
   - Click moon/sun icon
   - Theme should persist after refresh

---

## 🔐 Part 5: Custom Domain (Optional)

### For Vercel:

1. Buy domain (Namecheap, Google Domains, etc.)
2. In Vercel dashboard:
   - Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions
3. Wait for SSL certificate (automatic)

### For Render (Custom Backend URL):

1. In Render dashboard:
   - Settings → Custom Domains
   - Add your API subdomain (e.g., `api.yourdomain.com`)
   - Configure DNS records
2. Update `REACT_APP_API_URL` in Vercel

---

## 🐛 Common Issues & Solutions

### Issue: "Database connection failed"
**Solution:**
- Check DATABASE_URL is correct
- Ensure Neon database is active
- Run migrations: `npx prisma migrate deploy`

### Issue: "CORS errors"
**Solution:**
- Verify FRONTEND_URL in Render matches your Vercel URL exactly
- No trailing slash in URLs
- Redeploy Render service after changing env vars

### Issue: "Token expired" errors
**Solution:**
- JWT_SECRET must be the same in all environments
- Don't use different secrets in development/production
- Clear browser localStorage and login again

### Issue: "AI features not working"
**Solution:**
- Verify OPENAI_API_KEY is set in Render
- Check you have API credits
- Free tier has rate limits (20 requests/hour)

### Issue: "Slow first load"
**Solution:**
- Render free tier spins down after inactivity
- First request takes 30-60 seconds
- Upgrade to paid tier for always-on service

---

## 📊 Monitoring

### Render Dashboard:
- View logs: Dashboard → Logs
- Check metrics: Dashboard → Metrics
- Monitor usage: Dashboard → Usage

### Vercel Dashboard:
- Analytics: Dashboard → Analytics
- Function logs: Dashboard → Functions
- Deployment history: Dashboard → Deployments

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Neon | ✅ Free | 1 project, 0.5GB storage |
| Render | ✅ Free | 750 hours/month, spins down after inactivity |
| Vercel | ✅ Free | 100GB bandwidth, unlimited projects |
| OpenAI | 💵 Paid | ~$0.002 per request |

**Total Monthly Cost:** $0 - $5 (depending on OpenAI usage)

---

## 🔄 CI/CD (Automatic Deployments)

Both Vercel and Render support automatic deployments from GitHub:

### Enable Auto-Deploy:

1. **Vercel:**
   - Already enabled by default
   - Push to `main` → auto-deploy

2. **Render:**
   - Settings → Build & Deploy
   - Enable "Auto-Deploy"
   - Push to `main` → auto-deploy

---

## 📈 Scaling Tips

### When to Upgrade:

**Render ($7/month):**
- More than 750 hours/month
- Need always-on service
- Higher traffic

**Neon ($19/month):**
- More than 0.5GB data
- Need multiple databases
- Better performance

**Vercel Pro ($20/month):**
- More than 100GB bandwidth
- Team collaboration
- Advanced analytics

---

## 🎉 Success!

Your CodeSnip app is now live! Share with:
- Portfolio: Add to your resume
- LinkedIn: Share your project
- GitHub: Pin repository
- Twitter: Tweet about it

**App URL:** https://your-app.vercel.app
**API URL:** https://your-api.onrender.com
**Code:** https://github.com/YOUR_USERNAME/codesnip

---

## 📧 Support

Issues? Questions?
- Check logs in Render/Vercel
- Review IMPLEMENTATION_GUIDE.md
- Check GitHub issues

**Built with ❤️ for the job application at ClanX!**
