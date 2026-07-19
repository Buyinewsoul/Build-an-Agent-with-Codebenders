# Deploy ContentPulse to Vercel (Frontend) + Render (Backend)

---

## STEP 1: Create Vercel Account (2 minutes)

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Done! You're logged in.

---

## STEP 2: Deploy Frontend to Vercel (5 minutes)

### **2a. Create Vercel Project**

1. Go to https://vercel.com/new
2. Click "Select a Git Repository"
3. Find your repo: `Build-an-Agent-with-Codebenders`
4. Click "Import"

### **2b. Configure Build Settings**

Vercel will show a form. Fill in:

**Project Name:**
```
contentpulse-bedrock-frontend
```

**Framework Preset:**
```
Select: Create React App
```

**Root Directory:**
```
./ContentPulse-Bedrock/frontend
```

**Build Command:**
```
npm run build
```

**Output Directory:**
```
build
```

**Environment Variables:**
Add this one variable:

| Key | Value |
|-----|-------|
| REACT_APP_API_URL | (leave blank for now - we'll add after Render deploys) |

### **2c. Click "Deploy"**

Wait 2-3 minutes. You'll see: ✅ **Production Deployment Successful**

You'll get a URL like: `https://contentpulse-bedrock-frontend.vercel.app`

**Save this URL!**

---

## STEP 3: Deploy Backend to Render (5 minutes)

### **3a. Create Render Account**

1. Go to https://render.com/register
2. Sign up with GitHub
3. Authorize Render to access your GitHub
4. Done!

### **3b. Create Backend Service**

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Select your GitHub repo: `Build-an-Agent-with-Codebenders`
4. Click "Connect"

### **3c. Configure Service**

Fill in these fields:

| Field | Value |
|-------|-------|
| **Name** | contentpulse-bedrock-backend |
| **Environment** | Node |
| **Build Command** | `cd ContentPulse-Bedrock/backend && npm install` |
| **Start Command** | `cd ContentPulse-Bedrock/backend && npm start` |
| **Plan** | Free (or Starter for production) |

### **3d. Add Environment Variables**

Click "Advanced" → "Add Environment Variable"

Add these 5 variables:

| Key | Value |
|-----|-------|
| AWS_REGION | us-east-1 |
| AWS_ACCESS_KEY_ID | your_actual_key_here |
| AWS_SECRET_ACCESS_KEY | your_actual_secret_here |
| CLAUDE_MODEL | claude-3-5-sonnet-20241022 |
| LLAMA_MODEL | llama3.1-8b-instruct |
| PORT | 5001 |
| NODE_ENV | production |

⚠️ **Replace the AWS credentials with YOUR actual keys!**

### **3e. Click "Create Web Service"**

Wait 3-5 minutes for deployment. You'll see: ✅ **Live**

You'll get a URL like: `https://contentpulse-bedrock-backend.onrender.com`

**Save this URL!**

---

## STEP 4: Connect Frontend to Backend (2 minutes)

### **4a. Update Vercel Environment Variable**

1. Go to https://vercel.com/dashboard
2. Click your `contentpulse-bedrock-frontend` project
3. Click "Settings" → "Environment Variables"
4. Find or create `REACT_APP_API_URL`
5. Set the value to your Render backend URL:
   ```
   https://contentpulse-bedrock-backend.onrender.com
   ```
6. Click "Save"

### **4b. Redeploy Frontend**

1. Go to "Deployments" tab
2. Click the latest deployment
3. Click "Redeploy"
4. Wait 1-2 minutes

✅ **Done! Frontend and backend are now connected.**

---

## STEP 5: Test Your Live Agent (2 minutes)

1. Go to your Vercel frontend URL:
   ```
   https://contentpulse-bedrock-frontend.vercel.app
   ```

2. You should see the ContentPulse dashboard loading

3. Try asking a question in the chat:
   ```
   "What's our top performing topic?"
   ```

4. **If it works:** 🎉 Your agent is live!

5. **If it fails:** Check the browser console (F12) for error messages

---

## STEP 6: Share Your Live Agent URL

Your judges can now test the agent at:

```
🚀 https://contentpulse-bedrock-frontend.vercel.app
```

No setup needed. No credentials needed. Just click and test!

---

## Troubleshooting

### **Frontend won't load**
- Check that `REACT_APP_API_URL` is set correctly in Vercel
- Redeploy the frontend after updating env vars
- Check browser console (F12) for errors

### **Chat returns error**
- Check that Render backend is deployed and running
- Go to Render dashboard and check backend logs
- Verify AWS credentials are correct in Render env vars
- Check that `AWS_REGION` is set to `us-east-1`

### **Render backend goes to sleep**
- Free tier Render spins down after 15 min of inactivity
- Click the chat and it will wake up (takes 30 sec first request)
- Upgrade to "Starter" plan ($7/mo) to keep it always on

### **AWS calls failing**
- Verify your AWS credentials are correct
- Check AWS account has Bedrock access enabled
- Verify you haven't exceeded Bedrock quota

---

## URLs to Share

**With Judges:**
```
Frontend (Agent): https://contentpulse-bedrock-frontend.vercel.app
GitHub (Code): https://github.com/Buyinewsoul/Build-an-Agent-with-Codebenders
```

**Keep Private:**
- AWS credentials
- Render backend URL (judges don't need it)

---

## Next Steps

After deployment is live:

1. ✅ Test the agent in your browser
2. ✅ Take screenshots for your pitch deck
3. ✅ Share the frontend URL with judges
4. ✅ Practice your demo (live URL works better than local!)

You're all set! 🚀
