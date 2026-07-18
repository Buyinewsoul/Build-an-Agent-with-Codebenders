#!/bin/bash

# ContentPulse Bedrock Agent - Automated Test Execution
# This script will help you execute the test in the correct sequence

set -e  # Exit on any error

echo "=========================================="
echo "ContentPulse Bedrock Agent - Test Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend is running
echo -e "${YELLOW}[STEP 1]${NC} Checking if backend is already running..."
if curl -s http://localhost:5001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend is running${NC}"
else
    echo -e "${RED}✗ Backend is NOT running${NC}"
    echo ""
    echo "You need to start the backend in a separate terminal:"
    echo ""
    echo "  cd ContentPulse-Bedrock/backend"
    echo "  npm start"
    echo ""
    echo "Once you see: '🚀 ContentPulse Bedrock Agent Backend running on http://localhost:5001'"
    echo "Run this script again."
    exit 1
fi

echo ""
echo -e "${YELLOW}[STEP 2]${NC} Sending test request to /agent/insights endpoint..."
echo ""

# Make the API call and save response
RESPONSE=$(curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}' \
  -s -w "\n%{http_code}")

# Extract HTTP code
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo -e "${YELLOW}HTTP Status Code:${NC} $HTTP_CODE"
echo ""
echo -e "${YELLOW}Response Body:${NC}"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

# Validation
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ Status code is 200${NC}"
else
    echo -e "${RED}✗ Status code is $HTTP_CODE (expected 200)${NC}"
fi

if echo "$BODY" | jq . > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Response is valid JSON${NC}"
    
    # Check for error field
    if echo "$BODY" | jq -e '.error' > /dev/null 2>&1; then
        ERROR=$(echo "$BODY" | jq -r '.error')
        echo -e "${RED}✗ Response contains error: $ERROR${NC}"
    else
        echo -e "${GREEN}✓ No errors in response${NC}"
        
        # Check for insights field
        if echo "$BODY" | jq -e '.insights' > /dev/null 2>&1; then
            echo -e "${GREEN}✓ Insights field present${NC}"
        fi
    fi
else
    echo -e "${RED}✗ Response is not valid JSON${NC}"
fi

echo ""
echo "=========================================="
echo "Test Complete!"
echo "=========================================="
echo ""
echo "Copy the complete response above and paste it into the chat for verification."
