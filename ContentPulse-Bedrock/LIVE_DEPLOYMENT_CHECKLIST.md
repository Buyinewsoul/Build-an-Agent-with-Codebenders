# ContentPulse Live Deployment Checklist

## ✅ DEPLOYMENT STATUS

- [x] GitHub repo ready: https://github.com/Buyinewsoul/Build-an-Agent-with-Codebenders
- [x] Deployment config files created (vercel.json, render.yaml)
- [x] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Frontend & Backend connected
- [ ] Live testing completed

---

## PART 1: CREATE VERCEL ACCOUNT & DEPLOY FRONTEND

### Step 1a: Create Vercel Account
1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. You'll be logged in

### Step 1b: Import Project to Vercel
1. Go to https://vercel.com/new
2. You should see your GitHub account connected
3. Find and click `Build-an-Agent-with-Codebenders`
4. Click "Import"

### Step 1c: Configure Build Settings
Vercel will show deployment settings. **Configure as follows:**

| Setting | Value |
|---------|-------|
| Project Name | contentpulse-bedrock |
| Framework | Create React App (auto-detected) |
| Root Directory | `ContentPulse-Bedrock/frontend` |
| Build Command | `npm run build` |
| Output Directory | `build` |
| Install Command | `npm install` |

### Step 1d: Add Environment Variable
Scroll to "Environment Variables" section:

| Key | Value |
|-----|-------|
| REACT_APP_API_URL | `https://contentpulse-bedrock-backend.onrender.com` |

**Note:** We'll use Render's default URL. You can update this later.

### Step 1e: Click "Deploy"
- Wait 3-5 minutes for deployment
- You'll see a "Production Deployment Successful" message
- **Save your Vercel URL** (looks like: `https://contentpulse-bedrock.vercel.app`)

---

## PART 2: CREATE RENDER ACCOUNT & DEPLOY BACKEND

### Step 2a: Create Render Account
1. Go to https://render.com/register
2. Click "Continue with GitHub"
3. Authorize Render to access your GitHub account
4. Click "Accept" on the authorization page
5. You'll be logged in

### Step 2b: Create Web Service on Render
1. Go to https://dashboard.render.com
2. Click "New +" button (top-right)
3. Select "Web Service"
4. Find your GitHub repo: `Build-an-Agent-with-Codebenders`
5. Click "Connect"

### Step 2c: Configure Service Settings
Fill in these fields:

| Setting | Value |
|---------|-------|
| **Name** | contentpulse-bedrock-backend |
| **Environment** | Node |
| **Region** | Oregon (us-west) |
| **Branch** | main |
| **Build Command** | `cd ContentPulse-Bedrock/backend && npm install` |
| **Start Command** | `cd ContentPulse-Bedrock/backend && node src/server.js` |
| **Plan** | Free (NOTE: Services go to sleep after 15 min inactivity) |

### Step 2d: Add Environment Variables
1. Scroll to "Environment" section
2. Add these 6 variables:

| Key | Value |
|-----|-------|
| **AWS_REGION** | `us-east-1` |
| **AWS_ACCESS_KEY_ID** | `your_actual_aws_access_key` |
| **AWS_SECRET_ACCESS_KEY** | `your_actual_aws_secret_key` |
| **CLAUDE_MODEL** | `claude-3-5-sonnet-20241022` |
| **LLAMA_MODEL** | `llama3.1-8b-instruct` |
| **NODE_ENV** | `production` |

⚠️ **IMPORTANT:** Replace the AWS credentials with YOUR actual credentials!

### Step 2e: Click "Create Web Service"
- Render will start building (~3-5 minutes)
- You'll see logs showing build progress
- When complete, you'll see a URL like: `https://contentpulse-bedrock-backend.onrender.com`
- **Save this URL**

### Step 2f: Wait for First Deploy
- First deployment takes 5-10 minutes
- You'll see "Live" status and a green checkmark when done

---

## PART 3: CONNECT FRONTEND TO BACKEND

### Step 3a: Update Vercel Environment Variable
1. Go to https://vercel.com/dashboard
2. Click your `contentpulse-bedrock` project
3. Click "Settings" tab (top navigation)
4. Click "Environment Variables" (left sidebar)
5. Find `REACT_APP_API_URL`
6. Update the value to your Render backend URL:
   ```
   https://contentpulse-bedrock-backend.onrender.com
   ```
7. Click "Save"

### Step 3b: Redeploy Frontend
1. Go to "Deployments" tab
2. Click the latest deployment (the one just made)
3. Scroll to bottom, click "Redeploy"
4. Wait 2-3 minutes for redeployment

✅ **Frontend and backend are now connected!**

---

## PART 4: TEST LIVE AGENT

### Step 4a: Visit Your Live Agent
Open your Vercel frontend URL in your browser:
```
https://contentpulse-bedrock.vercel.app
```

### Step 4b: Test the Dashboard
1. Wait for page to load
2. You should see the analytics dashboard
3. Look for: 420 articles, 145K views, 7.8% engagement

### Step 4c: Test Chat
1. Click the 💬 Chat button in sidebar
2. Type a question:
   ```
   What's our top performing topic?
   ```
3. Wait 2-5 seconds for response (might be slow first time as Render wakes up)
4. You should see AI response about AI being the top topic

### Step 4d: Test Insights
1. Click the dashboard tab
2. Scroll down to "AI Insights" section
3. You should see generated insights
4. Click "Refresh" button to regenerate

✅ **If everything works, you're live!**

---

## PART 5: SHARE YOUR LIVE AGENT

### URLs to Share with Judges:

**Live Agent (Test Here!):**
```
https://contentpulse-bedrock.vercel.app
```

**GitHub Code:**
```
https://github.com/Buyinewsoul/Build-an-Agent-with-Codebenders
```

**Sample Introduction:**
> "Here's ContentPulse running live. You can test it right now—no setup needed. Ask it questions about content performance and it gives you instant AI-powered insights."

---

## TROUBLESHOOTING

### Frontend shows blank page
- Check browser console (F12 → Console)
- Look for error messages
- Verify `REACT_APP_API_URL` is correct in Vercel settings
- Redeploy frontend after changing env var

### Chat returns error
- Render might be spinning up (first request takes 30 sec)
- Wait a moment and try again
- Check Render dashboard logs for errors
- Verify AWS credentials are correct

### Insights not showing
- Same as chat—likely Render spinning up
- Refresh the page
- Wait 30 seconds and try again

### "Cannot connect to API"
- Backend might still be deploying
- Go to Render dashboard
- Check that service shows "Live" with green checkmark
- If deploying, wait for it to finish

### Backend shows errors about AWS
- Verify credentials in Render environment variables
- Check AWS account has Bedrock enabled
- Try with correct region: `us-east-1`

---

## IMPORTANT NOTES

### Render Free Tier
- Services automatically spin down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Upgrade to Starter ($7/month) for always-on service

### Don't Share These URLs
- ❌ Never share your AWS credentials
- ❌ Never share the Render backend URL publicly (though it's not a secret)
- ✅ Only share the Vercel frontend URL with judges

### Cost
- Vercel frontend: FREE
- Render backend: FREE tier (or $7/month for starter)
- AWS Bedrock: Pay-per-token (~$0.01-0.05 per API call)
- **Total: $0-10/month** depending on usage

---

## NEXT STEPS AFTER DEPLOYMENT

1. ✅ Test the live agent thoroughly
2. ✅ Take screenshots for your pitch deck
3. ✅ Update your presentation with live URL
4. ✅ Practice your demo using the live URL (better than local!)
5. ✅ Share URL with judges before hackathon
6. ✅ Have backup: Local setup still works if live goes down

---

## SUCCESS CHECKLIST

- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Render account created
- [ ] Backend deployed to Render with AWS credentials
- [ ] Frontend → Backend connection verified
- [ ] Dashboard loads correctly
- [ ] Chat works and returns AI responses
- [ ] Insights load correctly
- [ ] Live URL works from different device/browser
- [ ] Ready to share with judges

---

**When everything is complete, you'll have a public URL that anyone can visit and test your ContentPulse agent instantly!** 🚀
