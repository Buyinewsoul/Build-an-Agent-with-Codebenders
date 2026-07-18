# 🎬 VISUAL EXECUTION GUIDE

## THE THREE COMMANDS YOU MUST EXECUTE

### COMMAND 1️⃣: Stop Backend
```
Press: Ctrl + C
Location: Terminal 1 (in ContentPulse-Bedrock/backend)
Purpose: Stop any running backend process
```

---

### COMMAND 2️⃣: Start Backend
```bash
npm start
```

**Exact Steps:**
1. Open Terminal 1
2. Navigate to: `cd ContentPulse-Bedrock/backend`
3. Type: `npm start`
4. Press: Enter
5. Wait: 5-10 seconds for server to start

**Expected Output:**
```
🚀 ContentPulse Bedrock Agent Backend running on http://localhost:5001
📊 Health check: GET /health
📈 Analytics data: GET /analytics/data
💬 Chat: POST /agent/chat
🔍 Insights: POST /agent/insights
📄 Report: POST /agent/report
🤖 Complex request: POST /agent/request
🔎 Query analytics: POST /agent/query
```

**If you see this ✅, proceed to Command 3**

---

### COMMAND 3️⃣: Test Claude Insights (THE MAIN TEST)

**In a NEW Terminal 2, run this ENTIRE command:**

```bash
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

**Exact Steps:**
1. Open Terminal 2 (keep Terminal 1 running)
2. Copy the command above
3. Paste it into Terminal 2
4. Press: Enter
5. Wait: 10-15 seconds (Claude is thinking!)
6. You'll see a JSON response

---

## 📊 WHAT TO EXPECT

### Timeline:
```
T+0s  → You press Enter
T+2s  → Backend receives request
T+3s  → Claude model invoked
T+8s  → Claude generating insights...
T+13s → Response appears in Terminal 2
```

### Response Will Look Like:
```json
{
  "success": true,
  "insights": "## Content Performance Analysis\n\nBased on your analytics, your top-performing topics are AI with 15,420 views and 8.6% engagement. Marketing content shows strong conversion rates at 2.1%, while Finance articles have consistent time-on-page metrics of 4.2 minutes...",
  "timestamp": "2026-07-18T21:00:00.000Z"
}
```

---

## ✅ SUCCESS INDICATORS

**You'll know it worked when:**

- ✅ Response starts with `{` (valid JSON)
- ✅ Contains `"success": true`
- ✅ Contains `"insights":` with text
- ✅ NO error field
- ✅ NO "Unexpected field type" message
- ✅ Response takes 10-15 seconds (normal for Claude)

---

## ❌ FAILURE INDICATORS

**If you see these, something's wrong:**

- ❌ `"error": "Unexpected field type"` ← This is what we FIXED
- ❌ `Connection refused` ← Backend not running
- ❌ `"error": "Access denied"` ← AWS permissions issue
- ❌ `"error": "Resolved credential object is not valid"` ← .env issue
- ❌ Empty response ← API timeout

---

## 🎯 YOUR NEXT STEP

**Execute Commands 1, 2, and 3 RIGHT NOW.**

Then copy-paste the output from Command 3 (the JSON response) into this chat.

---

## 📝 WHAT TO COPY & PASTE

After running Command 3, you'll see something like this in Terminal 2:

```
(base) MacBook-Air:backend user$ curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
{"success":true,"insights":"## Content Performance Analysis\n\nBased on your analytics...","timestamp":"2026-07-18T..."}(base) MacBook-Air:backend user$ 
```

**Copy this:** `{"success":true,"insights":"...","timestamp":"..."}`

**Paste it here in the chat.**

---

## ⏱️ TIMING

- Backend start: 5 seconds
- Test execution: 15 seconds
- **Total time: ~20 seconds**

**Do this now!** ⏳

---

## 🚀 READY?

**Execute the three commands and share your output.** 🎬
