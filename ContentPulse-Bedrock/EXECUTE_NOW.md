# IMMEDIATE ACTION REQUIRED

## Execute these steps RIGHT NOW in your terminal

### ⏱️ Timing: 5-10 minutes total

---

## STEP 1️⃣: Open Terminal 1 and start the backend

```bash
cd ContentPulse-Bedrock/backend
npm start
```

### Wait until you see:
```
🚀 ContentPulse Bedrock Agent Backend running on http://localhost:5001
```

**This means the backend is ready.**

---

## STEP 2️⃣: Open Terminal 2 and run the test

```bash
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

### Wait 10-15 seconds for the response

Claude is analyzing your data.

---

## STEP 3️⃣: Copy the response

**Select all the output** (including the `{` at the start and `}` at the end)

**Copy it** (Cmd+C on Mac, Ctrl+C on Windows)

---

## STEP 4️⃣: Paste in the chat

Come back to this chat and **paste the entire response** in your next message.

---

## ✅ What Success Looks Like

**Terminal 1** should show:
```
POST /agent/insights
```

**Terminal 2** should show:
```json
{
  "success": true,
  "insights": "[Claude's analysis text here]",
  "timestamp": "2025-01-15T..."
}
```

---

## ❌ What Failure Looks Like

If you see this:
```json
{
  "success": false,
  "error": "Unexpected field type 'array' for field 'system'..."
}
```

**This means the fix isn't applied.** Contact immediately.

---

## 🚀 Go Now!

Execute Step 1 in Terminal 1 right now.

Then execute Step 2 in Terminal 2.

Then paste the response here.

**I'm waiting.** ⏳
