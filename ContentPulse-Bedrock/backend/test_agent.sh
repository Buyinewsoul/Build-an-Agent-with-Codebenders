#!/bin/bash

# Comprehensive test script for ContentPulse Bedrock Agent
echo "================================"
echo "ContentPulse Bedrock Agent Tests"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:5001"

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check${NC}"
echo "Command: curl $BASE_URL/health"
RESPONSE=$(curl -s "$BASE_URL/health")
echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q "healthy"; then
  echo -e "${GREEN}✅ PASS${NC}"
else
  echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

# Test 2: Analytics Data
echo -e "${YELLOW}Test 2: Get Analytics Data${NC}"
echo "Command: curl $BASE_URL/analytics/data"
RESPONSE=$(curl -s "$BASE_URL/analytics/data")
ARTICLE_COUNT=$(echo "$RESPONSE" | grep -o '"totalArticles":[0-9]*' | cut -d: -f2)
echo "Total Articles Found: $ARTICLE_COUNT"
if [ "$ARTICLE_COUNT" -gt 0 ]; then
  echo -e "${GREEN}✅ PASS${NC}"
else
  echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

# Test 3: Chat with Llama
echo -e "${YELLOW}Test 3: Chat with Llama 3.1${NC}"
echo "Command: curl -X POST $BASE_URL/agent/chat"
echo "Waiting 15 seconds for Llama response..."
RESPONSE=$(curl -s -X POST "$BASE_URL/agent/chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"What are my top performing topics?"}')
echo "Response (first 200 chars): ${RESPONSE:0:200}..."
if echo "$RESPONSE" | grep -q "success"; then
  if echo "$RESPONSE" | grep -q "true"; then
    echo -e "${GREEN}✅ PASS${NC}"
  else
    echo -e "${RED}❌ FAIL - Error in response${NC}"
  fi
else
  echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

# Test 4: Generate Insights with Claude
echo -e "${YELLOW}Test 4: Generate Insights with Claude 4.5${NC}"
echo "Command: curl -X POST $BASE_URL/agent/insights"
echo "Waiting 15 seconds for Claude response..."
RESPONSE=$(curl -s -X POST "$BASE_URL/agent/insights" \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}')
echo "Response (first 200 chars): ${RESPONSE:0:200}..."
if echo "$RESPONSE" | grep -q "success"; then
  if echo "$RESPONSE" | grep -q "true"; then
    echo -e "${GREEN}✅ PASS${NC}"
  else
    echo -e "${RED}❌ FAIL - Error in response${NC}"
    echo "Full error: $RESPONSE"
  fi
else
  echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

# Test 5: Generate Report
echo -e "${YELLOW}Test 5: Generate Report${NC}"
echo "Command: curl -X POST $BASE_URL/agent/report"
echo "Waiting 15 seconds for report generation..."
RESPONSE=$(curl -s -X POST "$BASE_URL/agent/report" \
  -H "Content-Type: application/json" \
  -d '{"reportType":"summary"}')
echo "Response (first 200 chars): ${RESPONSE:0:200}..."
if echo "$RESPONSE" | grep -q "success"; then
  if echo "$RESPONSE" | grep -q "true"; then
    echo -e "${GREEN}✅ PASS${NC}"
  else
    echo -e "${RED}❌ FAIL - Error in response${NC}"
  fi
else
  echo -e "${RED}❌ FAIL${NC}"
fi
echo ""

echo "================================"
echo "All tests completed!"
echo "================================"
