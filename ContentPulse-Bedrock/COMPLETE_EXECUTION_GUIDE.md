# 📖 COMPLETE EXECUTION GUIDE - EVERYTHING YOU NEED

This is the comprehensive guide that covers every possible scenario.

---

## BEFORE YOU START

### Prerequisites Check
- [ ] You have Node.js installed: `node --version` (should be 14+)
- [ ] You have npm installed: `npm --version` (should be 6+)
- [ ] You have 2-3 terminal windows open
- [ ] You can copy/paste text
- [ ] You have internet access

### Project Location
```
ContentPulse-Bedrock/
├── backend/      ← Terminal 1 goes here
├── frontend/     ← Terminal 3 goes here
└── [documentation]
```

---

## PHASE 1: BACKEND STARTUP

### Step 1.1: Navigate to Backend
```bash
# Terminal 1
cd ContentPulse-Bedrock/backend
```

### Step 1.2: Install Dependencies (First time only)
```bash
# Terminal 1
npm install
```

**Expected output:**
```
added 50 packages in 10.5s
```

### Step 1.3: Start Backend
```bash
# Terminal 1
npm start
```

**Expected output (within 5 seconds):**
```
> contentpulse-bedrock-backend@1.0.0 start
> node src/server.js

🚀 ContentPulse Bedrock Agent Backend running on http://localhost:5001
📊 Health check: GET /health
📈 Analytics data: GET /analytics/data
💬 Chat: POST /agent/chat
🔍 Insights: POST /agent/insights
📄 Report: POST /agent/report
🤖 Complex request: POST /agent/request
🔎 Query analytics: POST /agent/query
```

**What each message means:**
- 🚀 = Backend started successfully
- http://localhost:5001 = Server is listening on this port
- The emoji lines = Available endpoints

**Status: ✅ COMPLETE** when you see the green message above.

---

## PHASE 2: CURL TEST

### Step 2.1: Wait for Backend
**In Terminal 1, verify:**
- You see the 🚀 message
- You see "running on http://localhost:5001"
- No error messages below

### Step 2.2: Open Terminal 2
Open a **NEW terminal window** (don't close Terminal 1)

### Step 2.3: Run Curl Command
```bash
# Terminal 2
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

**Note:** This is a single command split across multiple lines. Copy the entire thing.

### Step 2.4: Wait for Response
**Expected wait time:** 15-20 seconds

Claude is analyzing your data. This is normal.

### Step 2.5: Response Received
You should see:

```json
{
  "success": true,
  "insights": "Based on the content analytics data provided, here are key insights about your content performance:\n\n**Top Performing Topics:**\n...",
  "timestamp": "2025-01-15T10:30:45.123Z"
}
```

**Key things to look for:**
- Starts with `{`
- Contains `"success": true`
- Contains `"insights":` with analysis text
- Contains `"timestamp":` with a date
- Ends with `}`
- NO `"error"` field
- NO "Unexpected field type" text

**Status: ✅ COMPLETE** when you see complete JSON response.

---

## PHASE 3: COPY & PASTE

### Step 3.1: Copy Terminal 1 Output
**From Terminal 1:**
1. Select all text from `npm start` onwards
2. Include the green message: `🚀 ContentPulse Bedrock Agent Backend running...`
3. Include all endpoint listings
4. Copy (Cmd+C on Mac, Ctrl+C on Windows... wait, that's terminal)
5. Actually: Select with mouse, then Edit → Copy (or right-click → Copy)

### Step 3.2: Copy Terminal 2 Output
**From Terminal 2:**
1. Select the complete JSON response
2. From opening `{` to closing `}`
3. Include the entire `insights` content (might be multiple lines)
4. Copy everything

### Step 3.3: Paste in Chat
**Format your message as:**

```markdown
## Backend Startup (Terminal 1)

[Paste Terminal 1 output here]

## Curl Test Response (Terminal 2)

[Paste Terminal 2 output here]

## Any Issues

None
```

**Then send the message.**

---

## TROUBLESHOOTING

### Issue: "Cannot find module 'express'"

**This means:** Dependencies not installed

**Fix:**
```bash
# Terminal 1
npm install
npm start
```

---

### Issue: "EADDRINUSE: address already in use :::5001"

**This means:** Another process is using port 5001

**Fix option 1: Kill the process**
```bash
# Terminal 1
lsof -i :5001          # Find what's using it
kill -9 <PID>          # Kill that process
npm start              # Try again
```

**Fix option 2: Use different port**
```bash
# Terminal 1
PORT=5002 npm start    # Start on port 5002
```

Then use `curl http://127.0.0.1:5002/agent/insights` instead.

---

### Issue: "Connection refused" from curl

**This means:** Backend not running

**Fix:**
1. Check Terminal 1 - does it show green message?
2. If not, start backend in Terminal 1: `npm start`
3. Wait 5 seconds
4. Try curl again

---

### Issue: Curl timeout (waits 30+ seconds with no response)

**This means:** Claude is slow or connection issue

**Fix:**
1. Wait up to 30 seconds
2. If still nothing, press Ctrl+C to cancel
3. Try again
4. If repeats, check AWS credentials in .env

---

### Issue: "Unexpected field type 'array' for field 'system'" error

**🔴 THIS IS THE BUG WE FIXED**

**This means:** The fix wasn't applied

**Fix:**
1. Go to `backend/src/config.js`
2. Look at lines 17-21
3. Should show:
   ```javascript
   system: [
     {
       text: systemPrompt || "...",
     },
   ]
   ```
4. If not, apply the fix manually
5. Save the file
6. Restart backend in Terminal 1 (Ctrl+C, then npm start)
7. Try curl again

---

### Issue: Invalid JSON in response

**This means:** Response is malformed

**Fix:**
1. Copy the response more carefully
2. Make sure it starts with `{` and ends with `}`
3. Don't include any shell prompt lines
4. Paste just the JSON part

---

### Issue: AWS credential errors

**This means:** AWS credentials wrong or missing

**Fix:**
1. Check `backend/.env` file exists
2. Verify it has:
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_actual_key
   AWS_SECRET_ACCESS_KEY=your_actual_secret
   ```
3. Make sure credentials are correct
4. Save and restart backend

---

## EXPECTED RESPONSES BY PHASE

### Phase 1 Success Response
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

### Phase 2 Success Response
```json
{
  "success": true,
  "insights": "Based on the content analytics data provided...",
  "timestamp": "2025-01-15T10:30:45.123Z"
}
```

### Phase 1 Failure Response
```
Error: Cannot find module 'express'
```
→ Run `npm install` first

### Phase 2 Failure Response
```json
{
  "success": false,
  "error": "Unexpected field type 'array' for field 'system'..."
}
```
→ Bug fix not applied, check config.js lines 17-21

---

## VALIDATION CHECKLIST

After you receive response, verify:

**Terminal 1:**
- [ ] Shows npm start command
- [ ] Shows green 🚀 message
- [ ] Port 5001 shown
- [ ] All endpoints listed
- [ ] No error messages

**Terminal 2:**
- [ ] Shows curl command executed
- [ ] Shows JSON response
- [ ] "success": true ✅
- [ ] "insights": [has content] ✅
- [ ] "timestamp": [is valid] ✅
- [ ] NO error field ✅
- [ ] NO "Unexpected field type" ✅

---

## NEXT STEPS AFTER SUCCESS

### If All Above Passes
1. Come back here
2. Paste both outputs using proper format
3. I'll validate instantly
4. I'll say "proceed to frontend"
5. Open Terminal 3
6. Run: `cd ContentPulse-Bedrock/frontend && npm start`
7. Wait for React compile (15 seconds)
8. Open http://localhost:3000 in browser
9. Test features

---

## QUICK COMMAND REFERENCE

```bash
# Terminal 1: Start Backend
cd ContentPulse-Bedrock/backend
npm install  # First time only
npm start

# Terminal 2: Test Backend
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'

# Terminal 3: Start Frontend (after backend test passes)
cd ContentPulse-Bedrock/frontend
npm install  # First time only
npm start

# Browser: Open frontend
# Go to: http://localhost:3000
```

---

## REFERENCE FILES

- **GO_NOW.md** - Quick start
- **DEBUGGING_GUIDE.md** - Troubleshooting
- **PRE_RESPONSE_CHECKLIST.md** - Before pasting
- **REALTIME_VALIDATOR.md** - How I validate
- **RESPONSE_TEMPLATE.md** - Formatting help

---

## YOU'RE READY IF

- ✅ Node.js and npm installed
- ✅ Two terminal windows open
- ✅ Understand the 3 phases
- ✅ Know what to copy/paste
- ✅ Read troubleshooting section
- ✅ Have reference files bookmarked

---

## GO EXECUTE NOW

### Terminal 1:
```bash
cd ContentPulse-Bedrock/backend
npm start
```

**Come back when you see the green message.**

---

**This is everything you need. Execute now!** ⏳
