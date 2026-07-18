# Response Parser & Validation Guide

## What to expect when you run the test

When you execute:
```bash
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

### Expected Response Format (Success Case)

```json
{
  "success": true,
  "insights": "[This will be a long text response from Claude analyzing your content performance]",
  "timestamp": "2025-01-15T10:30:45.123Z"
}
```

### Key Indicators of Success ✓

1. **HTTP Status Code**: `200`
2. **JSON Format**: Response is valid JSON (can be parsed)
3. **`success` field**: `true`
4. **`insights` field**: Contains a non-empty string with analysis
5. **`timestamp` field**: ISO format timestamp
6. **NO `error` field**: If `error` field exists, the request failed
7. **NO "Unexpected field type" error**: This was the bug we fixed!

### What indicates the fix worked

The OLD error (before fix) looked like:
```json
{
  "success": false,
  "error": "Unexpected field type 'array' for field 'system'. Expected: 'string'. Provided: [Object]"
}
```

The NEW success response should have:
- ✅ `"success": true`
- ✅ `"insights": "[long analysis text from Claude]"`
- ✅ No errors mentioning "Unexpected field type"

---

## Step-by-Step Test Execution

### Prerequisites
1. Backend code has the fix (checked ✓)
2. AWS credentials are in `.env` file
3. Node.js dependencies are installed

### Execution Flow

#### Terminal 1: Start Backend
```bash
cd ContentPulse-Bedrock/backend
npm start
```

**Wait for this message:**
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

#### Terminal 2: Test the Endpoint
```bash
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

**Expected output** (will be formatted as JSON on multiple lines):
```json
{
  "success": true,
  "insights": "Based on the content analytics data provided, here are key insights about your content performance:\n\n**Top Performing Topics:**\n- React Best Practices with 5,200 views and 24% engagement\n- ...[more content]",
  "timestamp": "2025-01-15T10:30:45.123Z"
}
```

### Validation Checklist

When you provide the response, verify:

- [ ] HTTP status is 200
- [ ] Response is valid JSON (parseable)
- [ ] `success` field equals `true`
- [ ] `insights` field contains text (not empty)
- [ ] `timestamp` field is present
- [ ] NO `error` field in response
- [ ] Response does NOT contain "Unexpected field type"
- [ ] Response does NOT contain "system" field type error

---

## Troubleshooting

### If you see "connection refused" error
- Backend is not running
- **Action**: Start the backend in Terminal 1 with `npm start`

### If you see "Unexpected field type" error
- Fix is not applied
- **Action**: Verify `ContentPulse-Bedrock/backend/src/config.js` lines 17-21 show:
  ```javascript
  system: [
    {
      text: systemPrompt || "You are an expert content analytics assistant.",
    },
  ],
  ```

### If you see AWS credential errors
- `.env` file is missing AWS credentials
- **Action**: Verify `ContentPulse-Bedrock/backend/.env` has:
  ```
  AWS_REGION=us-east-1
  AWS_ACCESS_KEY_ID=your_key
  AWS_SECRET_ACCESS_KEY=your_secret
  ```

### If response takes more than 30 seconds
- Claude is processing a longer analysis
- **Action**: Wait - this is normal. Claude responses can take 10-20 seconds

---

## Next Steps After Success

Once you've confirmed the test passes:

1. **Copy the full response** from the terminal
2. **Paste it in the chat** for verification
3. **Frontend will be started** (Terminal 3)
4. **End-to-end test** will be performed
5. **Project completion** verified

---

## Files Involved in This Fix

| File | Changes | Lines |
|------|---------|-------|
| `backend/src/config.js` | Fixed `system` parameter format | 17-21 |
| `backend/src/server.js` | Endpoint setup (no changes) | 86-102 |
| `backend/src/bedrockAgent.js` | Tool implementation (no changes) | 28-50 |

---

## Expected Response Content

The Claude response will analyze your mock data and include:

- Analysis of top-performing topics
- Engagement metrics and trends
- Content recommendations
- Performance insights
- Actionable recommendations

Example sections you should see:
- "Top Performing Topics"
- "Engagement Metrics"
- "Trend Analysis"
- "Recommendations"

---

**Now proceed to execute the test in your terminal and paste the response here.**
