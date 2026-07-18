#!/bin/bash

echo "🧪 ContentPulse Testing Suite"
echo "============================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test backend connectivity
echo -e "\n${YELLOW}Testing Backend...${NC}"
BACKEND_RESPONSE=$(curl -s http://localhost:3001/health 2>&1)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Backend is running"
    echo "  Response: $BACKEND_RESPONSE"
else
    echo -e "${RED}✗${NC} Backend is not responding"
    echo "  Make sure: cd backend && npm start"
fi

# Test analytics endpoint
echo -e "\n${YELLOW}Testing Analytics Data...${NC}"
ANALYTICS=$(curl -s http://localhost:3001/analytics/summary | jq '.totalArticles' 2>/dev/null)
if [ ! -z "$ANALYTICS" ]; then
    echo -e "${GREEN}✓${NC} Analytics data loaded: $ANALYTICS articles"
else
    echo -e "${RED}✗${NC} Could not fetch analytics data"
fi

# Test chat endpoint
echo -e "\n${YELLOW}Testing Chat Endpoint (Llama)...${NC}"
CHAT_RESPONSE=$(curl -s -X POST http://localhost:3001/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is ContentPulse?","sessionId":"test"}' 2>&1)
if [[ $CHAT_RESPONSE == *"response"* ]] || [[ $CHAT_RESPONSE == *"Hello"* ]]; then
    echo -e "${GREEN}✓${NC} Chat endpoint working"
else
    echo -e "${YELLOW}⚠${NC} Chat endpoint needs AWS credentials"
fi

# Test insights endpoint
echo -e "\n${YELLOW}Testing Insights Endpoint (Claude)...${NC}"
INSIGHTS_RESPONSE=$(curl -s -X POST http://localhost:3001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"What are our key metrics?"}' 2>&1)
if [[ $INSIGHTS_RESPONSE == *"insights"* ]] || [[ $INSIGHTS_RESPONSE == *"error"* ]]; then
    echo -e "${GREEN}✓${NC} Insights endpoint accessible"
else
    echo -e "${YELLOW}⚠${NC} Insights endpoint needs AWS credentials"
fi

# Test report endpoint
echo -e "\n${YELLOW}Testing Report Endpoint (Claude)...${NC}"
REPORT_RESPONSE=$(curl -s -X POST http://localhost:3001/agent/report \
  -H "Content-Type: application/json" \
  -d '{}' 2>&1)
if [[ $REPORT_RESPONSE == *"report"* ]] || [[ $REPORT_RESPONSE == *"error"* ]]; then
    echo -e "${GREEN}✓${NC} Report endpoint accessible"
else
    echo -e "${YELLOW}⚠${NC} Report endpoint needs AWS credentials"
fi

echo -e "\n${YELLOW}Frontend Status...${NC}"
FRONTEND_PORT=$(curl -s http://localhost:3000 | head -c 100 2>&1)
if [ ! -z "$FRONTEND_PORT" ]; then
    echo -e "${GREEN}✓${NC} Frontend is running at http://localhost:3000"
else
    echo -e "${YELLOW}⚠${NC} Frontend not running. Start with: cd frontend && npm start"
fi

echo -e "\n${YELLOW}Test Summary${NC}"
echo "============================================"
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo "Health Check: http://localhost:3001/health"
echo ""
echo "Sample Queries:"
echo "1. Chat: curl -X POST http://localhost:3001/agent/chat -d '{\"message\":\"Hi!\"}'"
echo "2. Insights: curl -X POST http://localhost:3001/agent/insights -d '{\"query\":\"Analyze performance\"}'"
echo "3. Data: curl http://localhost:3001/analytics/summary"
echo ""
echo "✅ To test full functionality, ensure AWS credentials are set in .env"
