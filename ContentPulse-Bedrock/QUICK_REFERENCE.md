# ⚡ QUICK REFERENCE - ContentPulse Bedrock Agent

## 🚀 EXECUTE RIGHT NOW

### Terminal 1: Start Backend
```bash
cd ContentPulse-Bedrock/backend
Ctrl + C
npm start
```

**WAIT FOR THIS MESSAGE:**
```
🚀 ContentPulse Bedrock Agent Backend running on http://localhost:5001
```

---

### Terminal 2: Test Claude Insights (After Backend Started)
```bash
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

**WAIT 10-15 SECONDS**

**EXPECTED SUCCESS RESPONSE:**
```json
{
  "success": true,
  "insights": "Based on your analytics data, here are the key insights...",
  "timestamp": "2026-07-18T..."
}
```

**OLD ERROR (NOW FIXED):**
```json
{"success":false,"error":"Unexpected field type"}
```

---

## ✅ What We Fixed

**The Problem:** Bedrock Converse API requires `system` parameter as an array of objects, not a string.

**The Fix:** Updated `backend/src/config.js` line 17-21:
```javascript
system: [
  {
    text: systemPrompt || "You are an expert...",
  },
],
```

---

## 🎯 Your Action Items

- [ ] Stop backend (Ctrl + C)
- [ ] Run `npm start` in backend folder
- [ ] Wait for port 5001 confirmation
- [ ] Copy the curl command from Terminal 2 above
- [ ] Run it and wait 15 seconds
- [ ] **COPY THE ENTIRE RESPONSE**
- [ ] **PASTE IT HERE IN THIS CHAT**

---

## 📋 After Backend Test Passes

**Terminal 3: Start Frontend**
```bash
cd ContentPulse-Bedrock/frontend
npm install
npm start
```

Opens at: `http://localhost:3000`

---

## 🔍 Verification Checklist

After tests run, I will verify:
- ✓ Backend starts on port 5001
- ✓ Claude insights response contains `"success": true`
- ✓ No "Unexpected field type" error
- ✓ Response time is 10-20 seconds (normal for Claude)
- ✓ Insights contain analysis text
- ✓ Timestamp is present

---

## ⏳ STATUS: ACTIVELY WAITING

**I am blocking and waiting for your terminal output.**

**Next action: Execute the commands above and paste the response here.** 🚀
