#!/bin/bash

# ContentPulse Deployment Readiness Check
# Run this to verify everything is ready for live deployment

echo "🔍 ContentPulse Deployment Readiness Verification"
echo "=================================================="
echo ""

# Check Git repo
echo "✓ Checking GitHub repo..."
if git remote -v | grep -q "github.com/Buyinewsoul/Build-an-Agent-with-Codebenders"; then
    echo "  ✅ GitHub repo connected"
else
    echo "  ❌ GitHub repo NOT connected"
    exit 1
fi

# Check frontend
echo ""
echo "✓ Checking Frontend..."
if [ -f "./ContentPulse-Bedrock/frontend/package.json" ]; then
    echo "  ✅ Frontend package.json exists"
else
    echo "  ❌ Frontend package.json missing"
    exit 1
fi

if [ -f "./ContentPulse-Bedrock/frontend/vercel.json" ]; then
    echo "  ✅ Vercel config exists"
else
    echo "  ❌ Vercel config missing"
    exit 1
fi

if [ -f "./ContentPulse-Bedrock/frontend/.vercelignore" ]; then
    echo "  ✅ .vercelignore exists"
else
    echo "  ❌ .vercelignore missing"
    exit 1
fi

# Check backend
echo ""
echo "✓ Checking Backend..."
if [ -f "./ContentPulse-Bedrock/backend/package.json" ]; then
    echo "  ✅ Backend package.json exists"
else
    echo "  ❌ Backend package.json missing"
    exit 1
fi

if [ -f "./ContentPulse-Bedrock/backend/.renderignore" ]; then
    echo "  ✅ .renderignore exists"
else
    echo "  ❌ .renderignore missing"
    exit 1
fi

if [ -f "./render.yaml" ]; then
    echo "  ✅ render.yaml exists"
else
    echo "  ❌ render.yaml missing"
    exit 1
fi

# Check deployment guides
echo ""
echo "✓ Checking Documentation..."
if [ -f "./ContentPulse-Bedrock/EXECUTE_DEPLOYMENT_NOW.md" ]; then
    echo "  ✅ Deployment guide exists"
else
    echo "  ❌ Deployment guide missing"
    exit 1
fi

# Check that backend has src/server.js
echo ""
echo "✓ Checking Backend Entry Point..."
if [ -f "./ContentPulse-Bedrock/backend/src/server.js" ]; then
    echo "  ✅ Backend entry point (src/server.js) exists"
else
    echo "  ❌ Backend entry point missing"
    exit 1
fi

# Check that frontend has public/index.html
echo ""
echo "✓ Checking Frontend Entry Point..."
if [ -f "./ContentPulse-Bedrock/frontend/public/index.html" ]; then
    echo "  ✅ Frontend entry point (public/index.html) exists"
else
    echo "  ❌ Frontend entry point missing"
    exit 1
fi

# Test Node syntax
echo ""
echo "✓ Checking Code Syntax..."
if node -c "./ContentPulse-Bedrock/backend/src/server.js" 2>/dev/null; then
    echo "  ✅ Backend syntax OK"
else
    echo "  ❌ Backend syntax error"
    exit 1
fi

if node -c "./ContentPulse-Bedrock/backend/src/bedrockAgent.js" 2>/dev/null; then
    echo "  ✅ Bedrock agent syntax OK"
else
    echo "  ❌ Bedrock agent syntax error"
    exit 1
fi

# Summary
echo ""
echo "=================================================="
echo "🎉 ALL CHECKS PASSED!"
echo "=================================================="
echo ""
echo "✅ Your code is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Open: https://vercel.com/signup"
echo "2. Create account with GitHub"
echo "3. Deploy frontend from: ContentPulse-Bedrock/frontend"
echo "4. Open: https://render.com/register"
echo "5. Create account with GitHub"
echo "6. Deploy backend from: ContentPulse-Bedrock/backend"
echo "7. Add AWS credentials in Render environment variables"
echo "8. Connect frontend to backend with Render URL"
echo ""
echo "See EXECUTE_DEPLOYMENT_NOW.md for detailed steps"
echo ""
