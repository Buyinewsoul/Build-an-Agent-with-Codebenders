# EXECUTE NOW: Live Deployment Instructions

## 🎯 Your Mission (Next 30 Minutes)

You will have a **live, public URL** that judges can visit and test ContentPulse instantly.

Current Status:
- ✅ GitHub repo ready with all code
- ✅ Deployment config files committed
- ⏳ **YOU ARE HERE** — Ready for manual deployment steps

---

## 🚀 QUICK START (5-Minute Timeline)

### **Minute 1-2: Vercel Setup**
1. Open: https://vercel.com/signup
2. Click "Continue with GitHub"
3. Follow GitHub authorization
4. ✅ Vercel account ready

### **Minute 3: Deploy Frontend**
1. Go to: https://vercel.com/new
2. Select repo: `Build-an-Agent-with-Codebenders`
3. Set Root Directory: `ContentPulse-Bedrock/frontend`
4. Click "Deploy"
5. ✅ Frontend deploying (2-3 min in background)
6. **Save your Vercel URL when done**

### **Minute 4-5: Render Setup**
1. Open: https://render.com/register
2. Click "Continue with GitHub"
3. Follow authorization
4. ✅ Render account ready

### **While Vercel is deploying: Start Render**
1. Go to: https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Select repo: `Build-an-Agent-with-Codebenders`
4. Click "Connect"
5. Configure settings (see below)
6. **Add your AWS credentials** (see below)
7. Click "Create Web Service"
8. ✅ Backend deploying (5 min in background)
9. **Save your Render URL when done**

### **When Both Are Deployed: Connect Them**
1. Go back to Vercel dashboard
2. Update `REACT_APP_API_URL` to your Render URL
3. Redeploy frontend
4. ✅ Frontend and backend connected (2 min)

### **Test It**
1. Visit your Vercel URL in browser
2. Click chat and ask: "What's our top performing topic?"
3. 🎉 **Live agent ready to show judges!**

---

## 📋 DETAILED STEPS

### STEP 1: Create Vercel Account

**Go to:** https://vercel.com/signup

1. Click blue "Continue with GitHub" button
2. You'll see GitHub authorization screen
3. Click "Authorize Vercel"
4. Done! You're logged into Vercel

**Next:** Go to https://vercel.com/new

---

### STEP 2: Deploy Frontend to Vercel

**You're at:** https://vercel.com/new

**What you see:** A form asking to select repository

1. Look for: `Build-an-Agent-with-Codebenders`
2. Click "Import" button next to it
3. **Vercel shows deployment config form**

**Fill in these fields:**

| Field | Fill With |
|-------|-----------|
| **Project Name** | `contentpulse-bedrock` |
| **Root Directory** | `ContentPulse-Bedrock/frontend` |
| **Build Command** | (leave as is) `npm run build` |
| **Output Directory** | (leave as is) `build` |

**Scroll down to "Environment Variables":**

| Key | Value |
|-----|-------|
| REACT_APP_API_URL | `https://contentpulse-bedrock-backend.onrender.com` |

(We'll update this with real URL after Render deploys)

**Click the blue "Deploy" button**

⏳ **Wait 3-5 minutes** while Vercel deploys

✅ **You'll see "Production Deployment Successful"**

**SAVE THIS URL:** It will look like `https://contentpulse-bedrock.vercel.app`

---

### STEP 3: Create Render Account

**Go to:** https://render.com/register

1. Click "Continue with GitHub"
2. Click "Authorize" on GitHub screen
3. Done! You're logged into Render

**Next:** Go to https://dashboard.render.com

---

### STEP 4: Deploy Backend to Render

**You're at:** https://dashboard.render.com

1. Click the blue "New +" button (top right)
2. Select "Web Service"
3. **Find your repo:** `Build-an-Agent-with-Codebenders`
4. Click "Connect"

**Render shows service configuration form**

**Fill in these fields:**

| Field | Fill With |
|-------|-----------|
| **Name** | `contentpulse-bedrock-backend` |
| **Environment** | Node |
| **Region** | Oregon (default is fine) |
| **Branch** | main |
| **Build Command** | `cd ContentPulse-Bedrock/backend && npm install` |
| **Start Command** | `cd ContentPulse-Bedrock/backend && node src/server.js` |
| **Plan** | Free |

**Scroll down to "Environment"**

**Add these 6 environment variables:**

| Key | Value |
|-----|-------|
| AWS_REGION | `us-east-1` |
| AWS_ACCESS_KEY_ID | **YOUR ACTUAL AWS KEY** |
| AWS_SECRET_ACCESS_KEY | **YOUR ACTUAL AWS SECRET** |
| CLAUDE_MODEL | `claude-3-5-sonnet-20241022` |
| LLAMA_MODEL | `llama3.1-8b-instruct` |
| NODE_ENV | `production` |

⚠️ **CRITICAL:** Replace the AWS credentials with YOUR actual keys!

**Click blue "Create Web Service" button**

⏳ **Wait 5-10 minutes** while Render deploys

✅ **You'll see "Live" status with green checkmark**

**SAVE THIS URL:** It will look like `https://contentpulse-bedrock-backend.onrender.com`

---

### STEP 5: Connect Frontend to Backend

**Go back to:** https://vercel.com/dashboard

1. Click your `contentpulse-bedrock` project
2. Click "Settings" tab (top navigation)
3. Click "Environment Variables" (left sidebar)
4. Find `REACT_APP_API_URL`
5. Update value to your **Render backend URL**:
   ```
   https://contentpulse-bedrock-backend.onrender.com
   ```
6. Click "Save"

**Go to "Deployments" tab**

1. Click the first deployment in the list
2. Scroll down to "Redeploy" button
3. Click it
4. ✅ Frontend redeploying with correct backend URL

---

### STEP 6: Test Live Agent

**Go to your Vercel URL:**
```
https://contentpulse-bedrock.vercel.app
```

**You should see:**
- ContentPulse dashboard loading
- Analytics cards: 420 articles, 145K views, 7.8% engagement
- Charts and top topics

**Test the chat:**
1. Click 💬 Chat button
2. Type: `What's our top performing topic?`
3. Wait 2-5 seconds (first request might be slow)
4. ✅ Should see AI response about AI being top topic

**If it works:** 🎉 **Your agent is LIVE!**

**If it fails:**
- Check browser console (F12)
- Look for error messages
- Common issue: Render still deploying (wait 5 more min)
- Try refreshing page

---

## 🔑 WHERE TO GET AWS CREDENTIALS

If you don't have your AWS credentials:

1. Go to: https://console.aws.amazon.com
2. Click your name (top right) → "Security credentials"
3. Click "Access keys" 
4. Click "Create access key"
5. Choose "Application running on a computer"
6. Copy both:
   - **Access Key ID** → paste into `AWS_ACCESS_KEY_ID`
   - **Secret Access Key** → paste into `AWS_SECRET_ACCESS_KEY`

---

## 📱 SHARE WITH JUDGES

Once everything is live:

**Send judges this:**
```
🚀 Test ContentPulse Live:
https://contentpulse-bedrock.vercel.app

📄 GitHub Code:
https://github.com/Buyinewsoul/Build-an-Agent-with-Codebenders
```

**They can click the link and test immediately. No setup needed!**

---

## ✅ SUCCESS CRITERIA

- [ ] Vercel frontend URL works in browser
- [ ] Dashboard shows data (420 articles)
- [ ] Chat works and responds to questions
- [ ] Insights load and show generated text
- [ ] No error messages in browser console
- [ ] Can access from another device
- [ ] Ready to demo to judges

---

## ⏱️ ESTIMATED TIME

- Vercel account: 2 min
- Deploy frontend: 5 min (includes waiting)
- Render account: 2 min
- Deploy backend: 10 min (includes waiting)
- Connect & test: 5 min
- **Total: ~25 minutes**

---

## 🎯 DO THIS RIGHT NOW

1. Open https://vercel.com/signup in your browser
2. Follow the steps above
3. Come back here if you hit any issues
4. When both are deployed, you'll have a live URL ready for judges

**LET'S GO! 🚀**
