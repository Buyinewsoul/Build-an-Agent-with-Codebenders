# Response Validation Schema

## Expected Responses for Each Test

### Test 1: Backend Health Check
**Command:**
```bash
curl http://localhost:5001/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-07-18T20:52:04.324Z"
}
```

**Validation:** Response contains `"status":"healthy"`

---

### Test 2: Analytics Data
**Command:**
```bash
curl http://localhost:5001/analytics/data
```

**Expected Response (sample):**
```json
{
  "success": true,
  "data": {
    "totalArticles": 420,
    "topics": ["AI", "Marketing", ...],
    "articles": [
      {
        "id": "article-1",
        "title": "...",
        "topic": "AI",
        "views": 15420,
        "engagement": 8.6,
        ...
      }
    ]
  }
}
```

**Validation:** 
- `"success": true`
- `"totalArticles": 420`

---

### Test 3: Chat with Llama
**Command:**
```bash
curl -X POST http://localhost:5001/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are my top performing topics?"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Based on your analytics, your top performing topics are AI, Marketing, and Finance with strong engagement rates...",
  "timestamp": "2026-07-18T..."
}
```

**Validation:**
- `"success": true`
- `"message"` contains text response
- Response length > 100 characters
- No error field

---

### Test 4: Claude Insights (MAIN TEST)
**Command:**
```bash
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

**Expected Response:**
```json
{
  "success": true,
  "insights": "## Content Performance Analysis\n\n### Key Findings:\n1. Your top-performing content focuses on AI...",
  "timestamp": "2026-07-18T..."
}
```

**Validation:**
- ✅ `"success": true` (not false)
- ✅ No error field present
- ✅ `"insights"` field contains text
- ✅ Insights length > 200 characters
- ✅ NO "Unexpected field type" error
- ✅ Response time was 10-20 seconds

**PREVIOUS ERROR (FIXED):**
```json
{"success":false,"error":"Unexpected field type"}
```

---

### Test 5: Report Generation
**Command:**
```bash
curl -X POST http://localhost:5001/agent/report \
  -H "Content-Type: application/json" \
  -d '{"reportType":"summary"}'
```

**Expected Response:**
```json
{
  "success": true,
  "reportType": "summary",
  "report": "# Content Performance Summary Report\n\n...",
  "generatedAt": "2026-07-18T...",
  "reportId": "uuid-string-here"
}
```

**Validation:**
- `"success": true`
- `"reportType": "summary"`
- `"report"` contains text
- `"reportId"` is present

---

## ✅ SUCCESS CRITERIA

All tests pass when:

1. **Health Check:** Returns healthy status ✓
2. **Analytics Data:** Returns 420 articles ✓
3. **Llama Chat:** Returns success with message ✓
4. **Claude Insights:** Returns success with insights (NO ERROR) ✓
5. **Report:** Returns success with report content ✓

---

## 🔴 FAILURE INDICATORS

If you see ANY of these, report it immediately:

- `"success": false` in any response
- `"error": "Unexpected field type"` ← This is what we fixed
- `"error": "Access denied"` ← AWS permissions issue
- `"error": "Resolved credential object is not valid"` ← .env issue
- Connection refused ← Backend not running
- Empty response ← API timeout

---

## YOUR TASK

1. Execute the backend start command
2. Execute the 5 curl tests (or run test_agent.sh)
3. **Copy the COMPLETE output**
4. **Paste it here**

I will then:
- Validate each response against this schema
- Confirm the fix works (success: true, no "Unexpected field type")
- Guide you to frontend startup
- Mark project complete

---

**AWAITING YOUR OUTPUT** ⏳
