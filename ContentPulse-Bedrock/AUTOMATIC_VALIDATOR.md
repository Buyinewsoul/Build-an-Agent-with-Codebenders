# 🔍 AUTOMATIC RESPONSE VALIDATOR & ANALYZER

This file will be used to validate your terminal output automatically.

---

## VALIDATION RULES (Will be applied to your response)

### Rule 1: Backend Startup Detection
```
PASS IF:
  - Contains "🚀" or "ContentPulse Bedrock Agent Backend"
  - Contains "http://localhost:5001"
  - Contains "running"
  - NO error messages
  - NO "Cannot find module"
  - NO "EADDRINUSE"
  - NO "Cannot read property"

FAIL IF:
  - Any error message present
  - No green message
  - Port different from 5001
  - Startup errors shown
```

### Rule 2: JSON Response Validity
```
PASS IF:
  - Response starts with {
  - Response ends with }
  - Can be parsed as valid JSON
  - Has matching braces and quotes
  - No syntax errors

FAIL IF:
  - Malformed JSON
  - Missing braces
  - Unclosed quotes
  - Parse errors
```

### Rule 3: Required Fields Check
```
PASS IF:
  - Contains "success" field
  - Contains "insights" field
  - Contains "timestamp" field
  - success value is true
  - insights is non-empty string
  - timestamp matches ISO format

FAIL IF:
  - Any required field missing
  - success is false
  - insights is empty
  - timestamp is invalid
  - error field present
```

### Rule 4: Bug Fix Verification (CRITICAL)
```
PASS IF:
  - NO "Unexpected field type" text
  - NO "Expected: 'string'. Provided: [Object]"
  - NO "system" parameter error
  - NO "field 'system'" error
  - NO AWS "field type" error
  - Claude successfully invoked

FAIL IF:
  - Any "Unexpected field type" text
  - Any system parameter error
  - Any AWS validation error about system
  - Claude not invoked
```

### Rule 5: AWS Connectivity Check
```
PASS IF:
  - NO "InvalidSignatureException"
  - NO "UnrecognizedClientException"
  - NO "Could not connect"
  - NO "Unable to reach"
  - NO credential errors
  - NO region errors
  - Claude responded

FAIL IF:
  - Any AWS credential error
  - Any authentication error
  - Any region mismatch
  - Any model access error
```

### Rule 6: Claude Response Quality
```
PASS IF:
  - insights contains 100+ characters
  - mentions "content" OR "analytics" OR "performance"
  - mentions topics OR engagement OR views
  - appears coherent and intelligent
  - relevant to the query "Analyze my content performance"

FAIL IF:
  - insights is empty
  - insights is just error message
  - insights is incoherent
  - less than 50 characters
  - completely irrelevant to query
```

### Rule 7: No Error Fields
```
PASS IF:
  - NO "error" field in JSON
  - NO "Error" in response
  - NO "error:" text

FAIL IF:
  - error field present
  - error field has value
  - error message in response
```

---

## VALIDATION SCORING

Each rule is scored:
- ✅ PASS = 1 point
- ❌ FAIL = 0 points

**Total: 7 possible points**

**Score Requirements:**
- 7/7 = ✅ **PERFECT** - Proceed to frontend
- 6/7 = ⚠️ **ACCEPTABLE** - Proceed with warning
- 5/7 = ❌ **FAILING** - Cannot proceed, debug needed
- <5 = ❌ **CRITICAL** - Major issue, investigation needed

---

## VALIDATION OUTPUT FORMAT

When I receive your output, I will respond with:

```markdown
## ✅ VALIDATION RESULTS

### Rule 1: Backend Startup
**Status:** ✅ PASS
**Evidence:** [Quote from output]
**Score:** 1/1

### Rule 2: JSON Validity
**Status:** ✅ PASS
**Evidence:** Valid JSON structure detected
**Score:** 1/1

### Rule 3: Required Fields
**Status:** ✅ PASS
**Details:**
- success: true ✅
- insights: [X characters] ✅
- timestamp: [valid] ✅
**Score:** 1/1

### Rule 4: Bug Fix Verification (CRITICAL)
**Status:** ✅ PASS
**Evidence:** NO "Unexpected field type" error found
**Score:** 1/1

### Rule 5: AWS Connectivity
**Status:** ✅ PASS
**Evidence:** Claude successfully invoked
**Score:** 1/1

### Rule 6: Claude Response Quality
**Status:** ✅ PASS
**Evidence:** [Sample from insights]
**Score:** 1/1

### Rule 7: No Error Fields
**Status:** ✅ PASS
**Evidence:** No error field in response
**Score:** 1/1

---

## FINAL SCORE: 7/7 ✅

**RESULT: ALL VALIDATION PASSED**

**BUG FIX STATUS: ✅ CONFIRMED WORKING**

**NEXT STEP: Proceed to frontend startup**

### Frontend Startup Command:
\`\`\`bash
cd ContentPulse-Bedrock/frontend && npm start
\`\`\`

### Expected Result:
Frontend React app starts on http://localhost:3000
```

---

## FAILURE RESPONSE FORMAT

If validation fails:

```markdown
## ❌ VALIDATION FAILED

### Failed Rule: [Which rule failed]
**Status:** ❌ FAIL
**Issue:** [What's wrong]
**Evidence:** [Quote from output]

**Impact:** Cannot proceed to frontend

**Diagnosis:** [What it means]

**Remediation:** [How to fix]

### Action Required:
[What user should do next]
```

---

## SPECIFIC SEARCHES IN YOUR OUTPUT

I will search for these EXACT phrases:

### Search for SUCCESS phrases:
- ✅ "🚀 ContentPulse Bedrock Agent Backend running"
- ✅ "http://localhost:5001"
- ✅ "\"success\": true"
- ✅ "\"insights\":"
- ✅ "\"timestamp\":"

### Search for BUG/ERROR phrases (should NOT find):
- ❌ "Unexpected field type"
- ❌ "Expected: 'string'"
- ❌ "Provided: [Object]"
- ❌ "field 'system'"
- ❌ "InvalidSignatureException"
- ❌ "UnrecognizedClientException"
- ❌ "Cannot find module"
- ❌ "EADDRINUSE"
- ❌ "Could not connect"

### Search for CLAUDE phrases (should find):
- ✅ Analysis text in insights
- ✅ Content-related words (topics, performance, engagement, views)
- ✅ Coherent English sentences

---

## PARSING STRATEGY

When you paste output, I will:

1. **Split by terminal section**
   - Extract "Backend startup" section
   - Extract "Curl response" section

2. **Find JSON in curl response**
   - Search for opening `{`
   - Search for closing `}`
   - Extract complete JSON block

3. **Parse JSON structure**
   - Identify success field
   - Extract insights text
   - Check timestamp
   - Look for error field

4. **Run all 7 validation rules**
   - Apply each rule to output
   - Generate pass/fail for each
   - Calculate total score

5. **Generate validation report**
   - Show results for each rule
   - Highlight any failures
   - Provide diagnosis if needed
   - Give next steps

6. **Make go/no-go decision**
   - If 7/7: PROCEED TO FRONTEND
   - If 6/7: PROCEED WITH CAUTION
   - If <6: INVESTIGATE ISSUE

---

## WHAT I'LL DO WITH DIFFERENT SCORES

### If 7/7 (Perfect)
✅ Confirm bug fix is working
✅ Praise the success
✅ Start frontend immediately
✅ Begin feature testing

### If 6/7 (One issue, non-critical)
⚠️ Note which rule failed
⚠️ Determine if critical
⚠️ Proceed if non-blocking
⚠️ Debug if needed

### If 5/7 or less (Critical)
❌ Identify the failure
❌ Explain what went wrong
❌ Cannot proceed
❌ Provide debugging steps

---

## FORMAT FOR YOUR RESPONSE

**Paste using this format:**

```
## Backend Startup (Terminal 1)

[Complete output from Terminal 1 - from start to the green message]

## Curl Test Response (Terminal 2)

[Complete output from Terminal 2 - the entire JSON response]

## Any Errors or Issues

[If you encountered any problems, describe them here]
```

---

## I'M READY TO VALIDATE

**Waiting for:** Your terminal output
**Validation:** Automatic upon receipt
**Time:** Immediate (within 1 second)
**Next step:** Automatic based on score

**Paste your output now and I'll validate immediately.** ⏳
