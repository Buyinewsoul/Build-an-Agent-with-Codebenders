# ✅ PRE-RESPONSE CHECKLIST

**Use this before you paste your output to ensure it's complete.**

---

## TERMINAL 1 OUTPUT CHECKLIST

Before you copy Terminal 1 output, verify:

- [ ] Shows: `cd ContentPulse-Bedrock/backend`
- [ ] Shows: `npm start`
- [ ] Shows: `> contentpulse-bedrock-backend@1.0.0 start`
- [ ] Shows: `> node src/server.js`
- [ ] Shows: `🚀 ContentPulse Bedrock Agent Backend running`
- [ ] Shows: `http://localhost:5001`
- [ ] Shows: Endpoint listings (📊, 📈, 💬, 🔍, etc.)
- [ ] No error messages visible
- [ ] Output is complete (from start of npm to finish)

**If ANY item is missing:**
→ Go back to Terminal 1
→ Wait for complete output
→ Don't proceed to curl yet

---

## TERMINAL 2 OUTPUT CHECKLIST

Before you copy Terminal 2 output, verify:

- [ ] Shows: `curl -X POST http://localhost:5001/agent/insights...`
- [ ] Shows: Opening `{` character
- [ ] Shows: `"success": true` (or false, but should be true)
- [ ] Shows: `"insights":` field with content
- [ ] Shows: `"timestamp":` field with ISO date
- [ ] Shows: Closing `}` character
- [ ] JSON looks complete and well-formed
- [ ] No truncation (message goes to end)
- [ ] No error wrapping the JSON

**If ANY item is missing:**
→ Go back to Terminal 2
→ Re-run the curl command
→ Get the complete output
→ Copy all of it

---

## OUTPUT COLLECTION CHECKLIST

Before you paste to chat:

- [ ] Terminal 1 output fully copied
- [ ] Terminal 2 output fully copied
- [ ] Used proper markdown formatting
- [ ] Included both sections (Backend + Curl)
- [ ] Used: ## Backend Startup (Terminal 1)
- [ ] Used: ## Curl Test Response (Terminal 2)
- [ ] Pasted exact output (no editing)
- [ ] No truncation
- [ ] No omissions

---

## COMMON ISSUES TO WATCH FOR

### Terminal 1 Issues
- [ ] "Cannot find module" → Run npm install first
- [ ] "EADDRINUSE" → Port 5001 in use, kill process
- [ ] No output → Backend might be hanging, wait 10 sec
- [ ] Errors after green message → Backend started, continue anyway

**If any issue, fix it and restart Terminal 1**

### Terminal 2 Issues
- [ ] "Connection refused" → Backend not running
- [ ] "Could not resolve host" → Use 127.0.0.1 instead
- [ ] Timeout (no response) → Claude taking time, wait 20 sec
- [ ] Non-JSON output → Something went wrong, try again

**If any issue, verify Terminal 1, then retry curl**

### Copy/Paste Issues
- [ ] Missing beginning → Scroll up in terminal, copy from top
- [ ] Missing end → Scroll down in terminal, copy to bottom
- [ ] Partial JSON → Make sure { to } is complete
- [ ] Double output → Only paste once, not twice

**If any issue, copy again carefully**

---

## TIMING EXPECTATIONS

### Terminal 1 (Backend Startup)
```
Expected time: 3-5 seconds
✓ PASS if: Green message appears
✓ Retry if: Nothing after 10 seconds
```

### Terminal 2 (Curl Test)
```
Expected time: 15-20 seconds total
  - 0-2 sec: Request sends
  - 2-17 sec: Claude processes
  - 17-20 sec: Response returns
✓ PASS if: JSON appears
✓ Retry if: Nothing after 30 seconds
```

---

## FORMATTING FOR YOUR RESPONSE

**Copy/paste exactly this structure:**

```markdown
## Backend Startup (Terminal 1)

[Paste your Terminal 1 output here - everything from npm start onwards]

## Curl Test Response (Terminal 2)

[Paste your complete JSON response here - from opening { to closing }]

## Any Issues Encountered

[Describe any problems, or write "None" if smooth]
```

---

## EXAMPLE OF CORRECT RESPONSE

```markdown
## Backend Startup (Terminal 1)

$ cd ContentPulse-Bedrock/backend
$ npm start

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

## Curl Test Response (Terminal 2)

{
  "success": true,
  "insights": "Based on the content analytics data provided, here are the key insights:\n\n**Top Performing Topics:**\n- React Best Practices: 5,200 views\n- Python Optimization: 4,800 views\n\n**Engagement Analysis:**\nAverage engagement rate is 12%, with React content performing highest at 24%.",
  "timestamp": "2025-01-15T10:30:45.123Z"
}

## Any Issues Encountered

None - executed smoothly!
```

---

## RED FLAGS - DO NOT PASTE IF:

- [ ] "Unexpected field type" appears anywhere → NOT READY
- [ ] Backend won't start → NOT READY
- [ ] Curl returns error → NOT READY
- [ ] JSON incomplete or malformed → NOT READY
- [ ] Missing required fields → NOT READY

**If ANY red flag, fix the issue first, then paste.**

---

## GREEN LIGHTS - OK TO PASTE IF:

- [ ] Backend started successfully (green message)
- [ ] Curl returned valid JSON
- [ ] success: true in response
- [ ] No "Unexpected field type" error
- [ ] Both outputs are complete
- [ ] Format is correct

**All green? Paste now!**

---

## FINAL VERIFICATION

Before hitting send:

1. **Read your response once** - Make sure it looks right
2. **Spot check the JSON** - { at start, } at end
3. **Verify both sections** - Terminal 1 and Terminal 2
4. **Check for errors** - Any red flags?
5. **Confirm completeness** - Nothing missing?

---

## YOU'RE READY IF:

- ✅ Terminal 1 shows green message on port 5001
- ✅ Terminal 2 shows complete JSON response
- ✅ Response formatted correctly
- ✅ All fields present
- ✅ No truncation
- ✅ Ready to paste

---

**Once you complete this checklist, paste your output in next message.**

**I will validate immediately.** ⏳
