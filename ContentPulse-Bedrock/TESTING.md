# Testing Guide

## Backend Testing

### 1. Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Get Analytics Data
```bash
curl http://localhost:5000/analytics/data
```

Expected response includes:
- `summary`: totalArticles (420), avgEngagement, totalConversions, totalViews
- `topicBreakdown`: stats for each topic
- `dailyTrend`: 14 days of metrics
- `topPerformingArticles`: top 10 articles
- `recentArticles`: last 10 published

### 3. Chat Endpoint
```bash
curl -X POST http://localhost:5000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the top 3 performing topics?",
    "context": ""
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Based on the analytics...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 4. Generate Insights
```bash
curl -X POST http://localhost:5000/agent/insights \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Analyze the content performance and identify key insights"
  }'
```

Expected response:
```json
{
  "success": true,
  "insights": "Here are the key insights...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 5. Generate Report
```bash
curl -X POST http://localhost:5000/agent/report \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "executive"
  }'
```

Options: `"summary"`, `"detailed"`, `"executive"`

Expected response:
```json
{
  "success": true,
  "reportType": "executive",
  "report": "Executive Summary Report...",
  "generatedAt": "2024-01-15T10:30:00.000Z",
  "reportId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 6. Query Analytics
```bash
curl -X POST http://localhost:5000/agent/query \
  -H "Content-Type: application/json" \
  -d '{
    "filters": {
      "topic": "AI",
      "minViews": 5000,
      "minEngagement": 3,
      "limit": 10
    }
  }'
```

Expected response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "AI Article...",
      "topic": "AI",
      "views": 12450,
      "engagement_rate": 8.5,
      "conversions": 1060
    }
  ],
  "count": 10
}
```

## Frontend Testing

### Component Tests

1. **Sidebar Navigation**
   - Click each nav item (Dashboard, Performance, Insights, Reports, Chat, Settings)
   - Verify active state styling changes
   - Check status indicator shows "Connected"

2. **Dashboard**
   - Verify 4 metric cards display (Total Articles, Avg. Engagement, Conversions, Views)
   - Check metric values are correct from API
   - Verify report buttons are clickable

3. **Performance Chart**
   - Verify line chart displays
   - Check 3 datasets (Views, Engagement, Conversions)
   - Hover over points to see tooltips

4. **Top Topics**
   - Verify 5 topic items display
   - Check rank numbers (1-5)
   - Verify engagement badges show percentages

5. **Insights Panel**
   - Click "Refresh" button
   - Wait for AI response
   - Verify formatted text displays

6. **Chat Interface**
   - Type a message and send
   - Verify message appears as user message
   - Wait for AI response
   - Check AI message appears below

7. **Reports Panel**
   - Click "Summary Report" button
   - Wait for report to generate
   - Verify report content displays
   - Check action buttons (Download, Share, Print)

## Integration Tests

### Test Flow 1: Dashboard -> Insights
1. Load dashboard
2. Verify metrics display
3. Click Insights tab
4. Verify insights appear

### Test Flow 2: Dashboard -> Chat
1. Load dashboard
2. Click Chat tab
3. Send message "What's my total views?"
4. Verify response from AI

### Test Flow 3: Dashboard -> Reports
1. Load dashboard
2. Click report button
3. Verify report generates
4. Click Reports tab
5. Verify report content displays

## Performance Tests

### Load Testing
```bash
# Test with 10 concurrent requests
for i in {1..10}; do
  curl http://localhost:5000/analytics/data &
done
wait
```

### Response Time
```bash
# Measure chat response time
time curl -X POST http://localhost:5000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are my top topics?"}'
```

Expected: < 3 seconds for chat, < 1 second for data queries

## Error Scenarios

### 1. Invalid Request
```bash
curl -X POST http://localhost:5000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{}'
```

Expected response:
```json
{
  "success": false,
  "error": "Message is required"
}
```

### 2. Missing AWS Credentials
Should show:
```
Error: Missing credentials in configuration
```

### 3. Invalid Report Type
```bash
curl -X POST http://localhost:5000/agent/report \
  -H "Content-Type: application/json" \
  -d '{"reportType":"invalid"}'
```

Should default to "summary" report

## Browser Testing

### Chrome DevTools
1. Open http://localhost:3000
2. Open DevTools (F12)
3. Check Console for errors
4. Monitor Network tab for API calls
5. Check Application tab for localStorage

### Responsive Design
- Desktop (1920x1080): Full layout
- Tablet (768x1024): 2-column layout
- Mobile (375x667): 1-column layout

## Automated Tests

### Backend Unit Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment Tests

### Production Build
```bash
cd frontend
npm run build
# Check build/ folder is created
ls -la build/
```

### Backend Production Start
```bash
cd backend
NODE_ENV=production npm start
```

## Monitoring

### Check Backend Logs
```bash
tail -f backend.log
```

### Check Frontend Browser Console
- Open DevTools console
- Look for any red errors
- Check network requests to backend

## Success Criteria

✅ All endpoints respond without errors
✅ Chat responses come within 3 seconds
✅ Reports generate within 5 seconds
✅ Insights generate within 5 seconds
✅ Dashboard displays metrics correctly
✅ Charts render properly
✅ No CORS errors in console
✅ No AWS credential errors
✅ All buttons are clickable
✅ Navigation switches between tabs

---

Ready to test? Let's go! 🚀
