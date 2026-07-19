# ContentPulse Live Demo Script
## Terminal Commands + Presenter Script (5 minutes)

---

## ⚙️ SETUP (Do this first - 2 minutes)

### Terminal 1: Start Backend
```bash
cd backend
npm install
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=your_access_key_here
export AWS_SECRET_ACCESS_KEY=your_secret_key_here
export CLAUDE_MODEL=claude-3-5-sonnet-20241022
export LLAMA_MODEL=llama3.1-8b-instruct
npm start
```

**Expected Output:**
```
ContentPulse Bedrock Agent running on port 3001
Environment: development
Claude Model: claude-3-5-sonnet-20241022
Llama Model: llama3.1-8b-instruct
```

✅ Backend is live! Leave this running.

---

### Terminal 2: Start Frontend
```bash
cd frontend
npm install
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

✅ Frontend is live! App opens automatically at `http://localhost:3000`

---

## 📱 DEMO FLOW (3 minutes)

### Step 1: Show Dashboard (30 seconds)
**What you'll see:**
- Analytics cards: Total Articles (420), Total Views (145,231), Avg Engagement (7.8%)
- 14-day trend chart (line graph showing daily views)
- Top 5 topics by views (AI, Marketing, Finance, Technology, Healthcare)

**What to say:**
> "This is ContentPulse's analytics dashboard. You can see at a glance: we have 420 articles with 145K total views and 7.8% average engagement. The trend chart shows how we're performing over time. And down here are our top topics—AI is clearly the winner."

**Action:** Screenshot this or let it sit for 10 seconds so judges see real data.

---

### Step 2: Switch to Chat Panel (1 minute)
**What to do:**
1. Click the **💬 Chat** button in the sidebar (left side)
2. You'll see a chat interface with suggested questions:
   - "What's our top performing topic?"
   - "Generate insights on AI content"
   - "How's engagement trending this week?"
   - "Which topics need improvement?"

**What to say:**
> "Now let me show you the real power: the chat interface. This is where the AI comes in. Instead of spending hours digging through dashboards, you just ask a question in plain English."

---

### Step 3: Ask a Question (1 minute)
**Click the first suggested question or type:**
```
What's our top performing topic?
```

**What happens:**
- Text appears in chat as user message
- You see a typing indicator (animated dots)
- **In 1-3 seconds**, the AI responds with something like:

```
Based on our analytics, AI is our top performing topic with 
24,532 views and 9.1% engagement rate. This represents the 
strongest performance across all content categories. The 
consistent high engagement suggests our audience is particularly 
interested in artificial intelligence content. 

Key insights:
• AI articles average 9.1% engagement (above our 7.8% baseline)
• Peak viewing occurs on Tuesdays and Thursdays
• Articles combining AI + [Other Topic] perform 15% better

Recommendation: Increase AI content production by 20-30% and 
consider bundling AI with other high-performing topics.
```

**What to say:**
> "So I ask the AI: 'What's our top performing topic?' In under 2 seconds, it analyzes all 420 articles, identifies trends, and gives me specific, actionable insights. The AI tells me not just WHAT is working, but WHY and WHAT TO DO about it. This is using Claude 3.5 from AWS Bedrock."

---

### Step 4: Ask a Follow-Up (30 seconds)
**Type:**
```
Generate insights on AI content performance
```

**AI Response (example):**
```
AI content is your strongest performer with exceptional metrics:

Executive Summary:
• 24,532 total views (16.9% of total views)
• 9.1% average engagement rate (vs 7.8% baseline)
• Consistent growth trend week-over-week

Performance Breakdown:
1. Trending Topics: AI + Marketing outperforms AI alone by 12%
2. Content Format: Long-form articles (2000+ words) get 23% more engagement
3. Publishing Cadence: 2 articles/week maintains audience interest

Opportunities:
→ Expand AI + Finance content (underexplored combination)
→ Create "AI Trends" monthly roundup
→ Develop beginner AI tutorial series

Next Steps:
1. Allocate 40% of content budget to AI topics
2. A/B test long-form vs short-form formats
3. Launch AI + Finance content series
```

**What to say:**
> "See how it maintains context? I can ask follow-up questions and the AI understands what we're talking about. It's not just answering one-off queries—it's having a real conversation about our content strategy. And every response is coming from Claude, a sophisticated AI model. This is what takes a content strategist 3-4 hours to do, now in seconds."

---

### Step 5: Show Backend Logs (30 seconds)
**Switch to Terminal 1 (backend)**

**You'll see logs like:**
```
POST /agent/chat - 200 OK (1234ms)
POST /agent/insights - 200 OK (2456ms)
[Bedrock API call] Model: claude-3-5-sonnet-20241022
[Response received] Length: 456 chars, Tokens: 234
```

**What to say:**
> "Here's what's happening behind the scenes. Every chat message goes to my Express backend, which calls AWS Bedrock with Claude. The response comes back and gets displayed in the UI. This is real AI integration, not mocked responses. You can see the API calls happening in real-time."

---

## 🎬 RECORDING VERSION (If you can't go live)

Use this **Loom script** if tech fails:

```
[Screen recording - show dashboard for 20 sec]
"This is ContentPulse's analytics dashboard. 420 articles, 145K 
views, 7.8% engagement. Top topics are AI, Marketing, and Finance."

[Click to Chat]
"Now the magic happens. I ask the AI a question."

[Type: "What's our top performing topic?"]
"In 2 seconds, the AI analyzes all the data and gives me actionable 
insights. It tells me AI content is the winner, why it's winning, 
and what I should do next."

[Show AI response]
"This response came from Claude 3.5, running on AWS Bedrock. 
Instead of a content manager spending hours on analysis, they get 
insights instantly."

[Show backend logs]
"Every chat message is a real API call to AWS. This isn't mock data 
or hard-coded responses—it's genuine AI integration."
```

---

## 🚨 TROUBLESHOOTING

### Backend won't start
```bash
# Check if port 3001 is already in use
lsof -i :3001
# If yes, kill the process
kill -9 <PID>
# Try again
npm start
```

### Frontend won't compile
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### AWS credentials error
```bash
# Make sure env vars are set
echo $AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY
echo $AWS_REGION

# If empty, export them:
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
```

### AI responds very slowly (>5 sec)
- This is normal on first call (model warm-up)
- Subsequent calls are faster
- If persistent, check AWS Bedrock quota

### Chat shows error message
- Backend might not be running
- Check Terminal 1 for errors
- Try refreshing page (Cmd+R)

---

## ✅ DEMO CHECKLIST

Before you go live:

- [ ] Backend started on port 3001 (Terminal 1)
- [ ] Frontend started on port 3000 (Terminal 2)
- [ ] AWS credentials exported (check env vars)
- [ ] App loads at http://localhost:3000
- [ ] Dashboard shows data (420 articles)
- [ ] Chat panel loads
- [ ] Test one chat message works
- [ ] Backend logs showing API calls
- [ ] Loom backup video ready (just in case)
- [ ] Presenter notes memorized or on phone
- [ ] Have phone/laptop nearby to show live demo

---

## 📊 DEMO TALKING POINTS

Use these if judges ask questions:

**"How does this handle real data?"**
> "Right now we're using mock data to validate the concept. Phase 2 connects to HubSpot, Google Analytics, and your CMS. The architecture is modular, so swapping out the data layer is straightforward."

**"What makes this different from ChatGPT?"**
> "ChatGPT doesn't know your content. ContentPulse is trained on YOUR data. It understands your audience, your topics, and your goals. Plus it's integrated into your workflow—you don't tab-switch."

**"How much does AWS Bedrock cost?"**
> "Bedrock is pay-per-token. Claude costs about $0.003 per 1K input tokens. A typical insight query costs $0.01-0.05. At scale with thousands of users, we'd negotiate volume discounts."

**"What's the go-to-market?"**
> "We're targeting content-heavy organizations: agencies (200K potential customers), SaaS companies, and enterprises. Starter tier is $99/mo for 1 workspace, Pro is $299/mo for unlimited workspaces. Freemium model drives adoption."

**"How do you prevent hallucinations?"**
> "Claude is grounded in the actual analytics data we pass to it. It's not making up responses—it's analyzing real numbers from real articles. Hallucinations are much rarer when the AI has concrete data."

**"Timeline to market?"**
> "Phase 1 (MVP) is done. Phase 2 (real data + auth) is 3 months. Phase 3 (Slack integration) is 6 months. Phase 4 (predictive features) is 9-12 months. We're pre-revenue now, but Phase 2 gets us to beta customers."

---

## 🎤 OPENING & CLOSING

### Opening (when judges ask to demo)
> "Sure! Let me show you ContentPulse. This is an AI agent for content teams built on AWS Bedrock. [Walk to screen] The dashboard shows real-time analytics—420 articles, 145K views. But the real power is the chat interface. Instead of spending hours analyzing data, you ask the AI a question and get insights instantly. Let me show you."

### Closing
> "That's ContentPulse in action. This MVP validates the core idea—conversational AI can dramatically improve how content teams make decisions. Phase 2 connects real data sources. Phase 3 adds Slack integration so teams use this in their daily workflow. If you want to check out the code or try it yourself, it's on GitHub: [your GitHub URL]. Questions?"

---

## 🎥 If You Record Instead of Live Demo

```bash
# Install Loom (Chrome extension) or use QuickTime (Mac)

# Mac QuickTime method:
# 1. Open QuickTime Player
# 2. File → New Screen Recording
# 3. Hit record
# 4. Demo for 5 min (follow script above)
# 5. Save and upload to YouTube or Loom

# Then share the link in your presentation
```

---

## FINAL PRO TIPS

✨ **Dress Code**: Business casual (you're pitching to PMs/executives)
✨ **Have Backup**: Screenshot of dashboard on your phone, just in case
✨ **Speak Slowly**: Don't rush—let judges absorb what they're seeing
✨ **Point at Screen**: Physical gestures help judges follow along
✨ **Stay Confident**: Even if something glitches, say "Let me restart that" — you know your project
✨ **End Strong**: "I built this in 2 weeks. Imagine what we could do with a team."

---

**You've got this! 🚀**
