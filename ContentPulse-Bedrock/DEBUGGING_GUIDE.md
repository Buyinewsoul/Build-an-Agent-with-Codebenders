# 🔧 COMPREHENSIVE DEBUGGING GUIDE

If any phase fails, use this guide to diagnose and fix.

---

## PHASE 1 DEBUGGING: Backend Startup Issues

### Symptom: "Cannot find module 'express'"
```
Error: Cannot find module 'express'
  at Function.Module._load...
```

**Diagnosis:** Dependencies not installed
**Fix:**
```bash
cd ContentPulse-Bedrock/backend
npm install
npm start
```

**Prevention:** Always run `npm install` first

---

### Symptom: "Port 5001 already in use" (EADDRINUSE)
```
Error: listen EADDRINUSE: address already in use :::5001
```

**Diagnosis:** Another process is using port 5001
**Fix:**
```bash
# Find what's using port 5001
lsof -i :5001

# Kill the process (replace PID with actual)
kill -9 <PID>

# Or use a different port
PORT=5002 npm start
```

**Prevention:** Close other instances of backend

---

### Symptom: "Cannot read property 'config' of undefined"
```
TypeError: Cannot read property 'config' of undefined
```

**Diagnosis:** Missing .env file or AWS credentials
**Fix:**
```bash
# Check .env exists
ls backend/.env

# Verify it has credentials
cat backend/.env | grep AWS

# If missing, add:
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret

npm start
```

**Prevention:** Ensure .env file is present and configured

---

### Symptom: Node.js version too old
```
Error: Unexpected token...
SyntaxError: Unexpected identifier
```

**Diagnosis:** Node.js version < 14
**Fix:**
```bash
# Check version
node --version

# If < 14, update Node.js
# Then try again
npm start
```

**Prevention:** Use Node.js 14+

---

### Symptom: Port 5001 not showing in output
```
$ npm start
(no output, just hangs)
```

**Diagnosis:** Backend starts but doesn't show message
**Fix:**
1. Wait 10 seconds
2. Test in Terminal 2: `curl http://localhost:5001/health`
3. If it responds, backend is running
4. Proceed to Phase 2

---

## PHASE 2 DEBUGGING: Curl Test Issues

### Symptom: "Connection refused"
```
curl: (7) Failed to connect to localhost port 5001: Connection refused
```

**Diagnosis:** Backend not running
**Fix:**
```bash
# Verify Terminal 1 shows the green message
# If not, start backend first
cd ContentPulse-Bedrock/backend
npm start

# Wait 5 seconds
# Then try curl again
```

---

### Symptom: "Could not resolve host"
```
curl: (6) Could not resolve host: localhost
```

**Diagnosis:** Network issue or localhost not available
**Fix:**
```bash
# Try using 127.0.0.1 instead
curl -X POST http://127.0.0.1:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'

# Or use machine IP
curl -X POST http://192.168.x.x:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

---

### Symptom: Curl timeout (no response after 30 seconds)
```
(curl hangs for 30+ seconds)
```

**Diagnosis:** Claude is taking too long or backend is stuck
**Fix:**
```bash
# Cancel this curl (Ctrl+C)
# Check Terminal 1 for errors
# Check AWS credentials in .env
# Try again with timeout:
curl --max-time 30 -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

---

### Symptom: "Unexpected field type" error (THE BUG)
```json
{
  "success": false,
  "error": "Unexpected field type 'array' for field 'system'. Expected: 'string'. Provided: [Object]"
}
```

**Diagnosis:** Bug fix not applied to config.js
**Fix:**
1. Open `backend/src/config.js`
2. Go to lines 17-21
3. Verify it shows:
   ```javascript
   system: [
     {
       text: systemPrompt || "You are an expert...",
     },
   ]
   ```
4. If not, apply the fix manually
5. Restart backend
6. Try curl again

---

### Symptom: AWS Credential Error
```json
{
  "success": false,
  "error": "InvalidSignatureException: Signature does not match"
}
```

**Diagnosis:** AWS credentials invalid or expired
**Fix:**
```bash
# Verify .env has correct credentials
cat backend/.env | grep -E "AWS_|REGION"

# Generate new credentials from AWS
# Update .env with new values
# Restart backend
npm start

# Try curl again
```

---

### Symptom: Model not found
```json
{
  "success": false,
  "error": "Could not validate provided model"
}
```

**Diagnosis:** Model ID incorrect or not available
**Fix:**
1. Check `backend/src/config.js` line 7
2. Verify model ID matches AWS Bedrock
3. Verify region is correct
4. Try different model ID
5. Restart and retry

---

## PHASE 3 DEBUGGING: Validation Issues

### Symptom: Invalid JSON in response
```
SyntaxError: Unexpected token < in JSON at position 0
```

**Diagnosis:** Response is not JSON (likely HTML error page)
**Fix:**
```bash
# Re-run curl and look for:
# - HTML error page (means backend failed)
# - Empty response (means request died)
# - Non-JSON output

# Check Terminal 1 for errors
# Look for error messages
# Fix the underlying issue
```

---

### Symptom: success: false in response
```json
{
  "success": false,
  "error": "Some error message"
}
```

**Diagnosis:** Backend encountered error processing request
**Fix:**
1. Check Terminal 1 output for error
2. Look for error details
3. Fix the underlying issue
4. Try curl again

---

### Symptom: Missing fields in response
```json
{
  "success": true
}
```

**Diagnosis:** Response doesn't have insights or timestamp
**Fix:**
1. Check if Claude responded at all
2. Verify insights field exists in response
3. Verify timestamp field exists
4. If missing, restart backend and try again

---

## PHASE 4 DEBUGGING: Frontend Startup Issues

### Symptom: "npm: command not found"
```
bash: npm: command not found
```

**Diagnosis:** Node.js/npm not installed
**Fix:**
```bash
# Check if Node.js installed
node --version

# Install from nodejs.org if needed
# Then try npm start again
```

---

### Symptom: "Port 3000 already in use"
```
Something is already running on port 3000
```

**Diagnosis:** Another React app using port 3000
**Fix:**
```bash
# Kill process on 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

---

### Symptom: "Cannot find module 'react'"
```
Error: Cannot find module 'react'
```

**Diagnosis:** Dependencies not installed in frontend
**Fix:**
```bash
cd ContentPulse-Bedrock/frontend
npm install
npm start
```

---

### Symptom: React won't compile (errors in console)
```
Compiled with problems:
ERROR in ./src/App.js
```

**Diagnosis:** JavaScript syntax error in frontend code
**Fix:**
1. Check error message in console
2. Go to file mentioned (e.g., App.js)
3. Look for syntax error
4. Fix the error
5. React will auto-reload

---

## PHASE 5 DEBUGGING: Feature Testing Issues

### Symptom: Dashboard doesn't load
```
Error: Failed to fetch /analytics/data
```

**Diagnosis:** Frontend can't connect to backend
**Fix:**
```bash
# Check backend is still running in Terminal 1
# Check API_BASE_URL in frontend/src/App.js
# Should be: http://localhost:5001

# If different, update it:
# const API_BASE_URL = 'http://localhost:5001'

# Verify CORS is enabled in backend
# Try accessing: curl http://localhost:5001/analytics/data
```

---

### Symptom: Chat doesn't send message
```
Failed to send message
```

**Diagnosis:** Chat endpoint not responding
**Fix:**
```bash
# Test endpoint in Terminal 2:
curl -X POST http://localhost:5001/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'

# If it fails, check backend errors
# Restart backend
# Try again
```

---

### Symptom: Insights doesn't generate
```
Failed to generate insights
```

**Diagnosis:** Insights endpoint not responding
**Fix:**
```bash
# Test endpoint:
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Test"}'

# If it fails, check backend
# Verify Claude credentials
# Check AWS errors in Terminal 1
```

---

## GENERAL DEBUGGING STEPS

### Step 1: Check Terminal 1 Output
Always look at Terminal 1 (backend) for error messages.
The answer is usually there.

### Step 2: Check Logs
```bash
# Terminal 1 shows real-time logs
# Look for ERROR, Warning, Exception
# These indicate problems
```

### Step 3: Test Individual Endpoints
```bash
# Test health check
curl http://localhost:5001/health

# Test analytics data
curl http://localhost:5001/analytics/data

# Test specific endpoint that's failing
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Test"}'
```

### Step 4: Restart Services
```bash
# Restart backend
# Terminal 1: Ctrl+C, then npm start

# Restart frontend
# Terminal 3: Ctrl+C, then npm start
```

### Step 5: Check Configuration
```bash
# Backend config
cat backend/.env | grep -E "AWS_|PORT"

# Verify credentials are correct
# Verify AWS region is us-east-1
```

### Step 6: Check Logs
```bash
# Look at error messages
# Search for "Error", "error", "ERROR"
# Read the full error message
# Google the error if needed
```

---

## COMMON ERROR MESSAGES & FIXES

| Error | Cause | Fix |
|-------|-------|-----|
| EADDRINUSE | Port in use | Kill process or use different port |
| Cannot find module | Missing dependency | Run npm install |
| EACCES | Permission denied | Check file permissions or use sudo |
| Unexpected field type | Bug not fixed | Apply fix to config.js lines 17-21 |
| InvalidSignatureException | Bad AWS credentials | Check .env file |
| Connection refused | Backend not running | Start backend with npm start |
| timeout | Request too long | Wait longer or check AWS |

---

## WHEN TO CONTACT SUPPORT

Contact if you see:
- ❌ "Unexpected field type" error (our bug fix didn't work)
- ❌ AWS credential errors (your credentials might be wrong)
- ❌ Multiple failures (something systemic)
- ❌ Code errors you didn't make (our code has issues)

---

**Use this guide to diagnose any issues that arise.**
**Most problems have simple fixes outlined here.**
**Don't give up - every issue is solvable!**
