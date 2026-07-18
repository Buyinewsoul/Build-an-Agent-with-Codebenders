# ContentPulse - Features & Capabilities

## Overview

ContentPulse is an **AI-powered content analytics platform** that leverages Amazon Bedrock to provide intelligent analysis, insights, and reporting for content performance data. The system combines multi-model AI capabilities with a comprehensive dashboard interface.

---

## Architecture Highlights

### Multi-Model AI Architecture

ContentPulse uses a **dual-model strategy** to optimize performance and cost:

#### 1. **Claude 3.5 Sonnet** - Deep Analysis & Reports
- **Use Cases:** In-depth analysis, report generation, complex reasoning
- **Strengths:** Advanced reasoning, detailed insights, professional formatting
- **Max Tokens:** 2048 (supports long-form content)
- **Endpoints:**
  - `/agent/insights` - Generate analytical insights
  - `/agent/report` - Create biweekly performance reports

#### 2. **Llama 3.1 8B** - Real-Time Conversation
- **Use Cases:** Quick answers, conversational queries, real-time chat
- **Strengths:** Fast responses, natural language understanding, context awareness
- **Max Tokens:** 512 (optimized for chat)
- **Endpoints:**
  - `/agent/chat` - Conversational message processing

### Model Selection Logic

```
User Query
    ↓
Route Determination
    ├─ Analytical Query → Claude 3.5 Sonnet (deep analysis)
    ├─ Conversational → Llama 3.1 (fast response)
    └─ Report Generation → Claude 3.5 Sonnet (formatting)
```

---

## Core Agent Tools

### Tool 1: Query Analytics (`queryAnalytics`)

**Purpose:** Retrieve and filter content analytics data

**Capabilities:**
- Filter articles by topic (AI, Marketing, Finance, Cybersecurity, Productivity, Cloud, DevOps, Web3)
- Filter by date range (90-day historical window)
- Filter by engagement rate, views, conversions
- Sort by multiple metrics
- Aggregate statistics

**Example Usage:**
```
"Show me all AI articles with engagement above 10% from the last 30 days"
→ Returns filtered dataset with rankings and metrics
```

**Returns:**
```json
{
  "articles": [
    {
      "id": "article-42",
      "title": "AI Trends 2024",
      "topic": "AI",
      "views": 45230,
      "engagementRate": 12.5,
      "conversions": 425,
      "publishDate": "2024-01-10"
    }
  ],
  "summary": {
    "totalMatched": 52,
    "avgEngagement": 10.8
  }
}
```

---

### Tool 2: Generate Insights (`generateInsights`)

**Purpose:** AI-powered analysis of content performance

**Capabilities:**
- Analyze content performance trends
- Identify high-performing topics
- Generate recommendations for content strategy
- Compare performance across topics
- Identify opportunities and risks
- Suggest optimization strategies

**Example Usage:**
```
"Analyze our content performance and identify key trends"
→ Claude generates 3-5 paragraph detailed analysis
```

**Output Format:**
```
📊 Content Performance Analysis

Key Findings:
• Topic X is outperforming with 15% engagement rate
• Topic Y needs strategic focus (3% engagement)
• Average views per article: 25,800

Strategic Recommendations:
1. Increase content production in Topic X (8 articles/month → 12)
2. Revamp Topic Y content strategy
3. Leverage top authors (Author A, Author B)

Opportunities:
- Cross-topic content could improve engagement
- Video content format suggested for Topic Z
```

---

### Tool 3: Generate Report (`generateReport`)

**Purpose:** Create structured, professional biweekly performance reports

**Capabilities:**
- Executive summary with key metrics
- Performance trends (14-day analysis)
- Top-performing content breakdown
- Topic performance matrix
- Author/contributor analysis
- Strategic recommendations
- Actionable next steps

**Example Usage:**
```
"Generate our biweekly report"
→ Claude creates comprehensive 2-week performance review
```

**Report Sections:**
1. **Executive Summary** - Key metrics and highlights
2. **Performance Overview** - Views, engagement, conversions
3. **Content Analysis** - Top performers, underperformers
4. **Topic Performance** - Breakdown by all 8 topics
5. **Author Performance** - Contributor rankings
6. **Recommendations** - Actionable next steps
7. **Forecast** - Expected performance next period

---

### Tool 4: Chat with Llama (`chatWithLlama`)

**Purpose:** Real-time conversational queries about content data

**Capabilities:**
- Natural language question answering
- Multi-turn conversation with context
- Session-based conversation history
- Quick data lookups
- Explanations and insights
- Follow-up question support

**Example Conversations:**

```
User: "What's our top performing topic?"
Assistant: Based on our analytics, AI is our top performer 
with 12.5% average engagement rate across 52 articles.

User: "Why is it performing better?"
Assistant: AI content gets higher engagement because...
[Context-aware follow-up response]

User: "Show me the top AI articles"
Assistant: Here are our best AI content pieces...
```

**Session Management:**
- Maintains conversation history per session
- Supports up to 20 messages per session
- Context-aware responses
- Automatic session timeout after inactivity

---

## Dashboard Components & Features

### 1. **Metrics Cards Panel**
Displays key performance indicators:
- **Total Articles:** 420 (total content library size)
- **Average Engagement Rate:** 8.6% (cross-content metric)
- **Total Conversions:** 310 (aggregate conversions)
- **Total Views:** 245K (total content impressions)

Features:
- Real-time metric updates
- Color-coded performance indicators
- Hover tooltips with detailed information

---

### 2. **Performance Trend Chart**
14-day historical trend visualization:
- **Multi-Series Chart** showing:
  - Views trend (blue line)
  - Engagement trend (green line)
  - Conversions trend (orange line)
- Interactive legend to toggle series
- Date range labels on X-axis
- Smooth animations

---

### 3. **Top Performing Topics**
Ranked list of content topics:
- **Ranking by:** Engagement rate (primary metric)
- **Displayed Information:**
  - Topic name
  - Article count
  - Average engagement rate
  - Trend indicator (↑↓ performance change)
- **Topics Included:** AI, Marketing, Finance, Cybersecurity, Productivity, Cloud, DevOps, Web3

---

### 4. **Chat Panel**
Real-time conversational interface:
- **Features:**
  - Auto-scrolling message display
  - Typing indicator during AI response
  - Message timestamps
  - Session-based history persistence
  - Suggested quick questions
  - Markdown formatting support

- **Quick Suggestion Questions:**
  - "What's our top topic?"
  - "Which articles performed best?"
  - "What trends do you see?"
  - "Analyze content strategy"

---

### 5. **Insights Panel**
AI-powered analysis interface:
- **Input:** Custom query text field
- **Processing:** Sends to Claude 3.5 Sonnet
- **Output:** Formatted insights with:
  - Loading animation during processing
  - Formatted multi-paragraph response
  - Key findings highlighted
  - Recommendations clearly listed
  - Copy-to-clipboard functionality

---

### 6. **Reports Panel**
Professional report generation:
- **Features:**
  - One-click biweekly report generation
  - Formatted report display
  - Download as text file
  - Report sections clearly organized
  - Timestamp of report generation

- **Report Contents:**
  - Executive summary
  - Key metrics
  - Performance analysis
  - Strategic recommendations
  - Forecast

---

### 7. **Sidebar Navigation**
8 navigation items:
1. Dashboard
2. Performance
3. Insights
4. Reports
5. Content
6. Data Sources
7. Settings
8. Help

- **Active Indicator:** Current section highlighted
- **Responsive:** Mobile-friendly menu collapse
- **Icons:** Visual identification for each section

---

## Mock Data System

### Dataset Characteristics

**Scale:** 420 articles (realistic content library)

**Distribution:**
- Evenly distributed across 8 topics (52-53 articles each)
- 90-day historical window
- 20 different authors (20-21 articles each)

**Metrics Generated:**
- **Views:** 1,000 - 50,000 per article (realistic range)
- **Engagement Rate:** 2% - 17% (realistic content performance)
- **Conversions:** 10 - 500 per article (correlated with views)
- **Publish Date:** Randomly distributed over 90 days

**Topics (8 categories):**
1. AI - Machine learning, AI trends, algorithms
2. Marketing - Content marketing, campaigns, analytics
3. Finance - Investment, trading, financial news
4. Cybersecurity - Security threats, best practices, tools
5. Productivity - Tools, workflows, time management
6. Cloud - AWS, Azure, cloud infrastructure
7. DevOps - CI/CD, infrastructure, automation
8. Web3 - Blockchain, crypto, NFTs

### Analytics Functions

**Get Summary:**
```javascript
getAnalyticsSummary() → {
  totalArticles: 420,
  totalViews: 8,234,567,
  avgEngagementRate: 8.6,
  totalConversions: 308776,
  topTopics: [...]
}
```

**Get 14-Day Trends:**
```javascript
getLast14Days() → [
  { date: "2024-01-01", views: 1250, engagement: 8.5, conversions: 95 },
  ...
]
```

**Get All Articles:**
```javascript
getAllArticles() → [
  { id, title, topic, views, engagementRate, conversions, publishDate, author },
  ...
]
```

---

## API Endpoints

### Analytics Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Service health check |
| `/analytics/data` | GET | Full analytics dataset (420 articles, summary, trends) |
| `/analytics/summary` | GET | Quick metrics (4 KPIs) |
| `/analytics/trends` | GET | 14-day trend data |

---

### Agent Endpoints

| Endpoint | Method | Model | Purpose |
|----------|--------|-------|---------|
| `/agent/chat` | POST | Llama 3.1 | Conversational queries (real-time) |
| `/agent/insights` | POST | Claude 3.5 | AI-powered analysis (deep insights) |
| `/agent/report` | POST | Claude 3.5 | Biweekly report generation |
| `/agent/query` | POST | Analytics | Filter and query data |

---

### Request/Response Examples

**Chat Request:**
```json
POST /agent/chat
{
  "message": "What's our top topic?",
  "sessionId": "session-abc123"
}
```

**Chat Response:**
```json
{
  "response": "Based on the analytics, AI is our top performing topic with an average engagement rate of 12.5%...",
  "sessionId": "session-abc123",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Insights Request:**
```json
POST /agent/insights
{
  "query": "Analyze content performance trends"
}
```

**Insights Response:**
```json
{
  "query": "Analyze content performance trends",
  "insights": "Based on the data, we observe several key trends...",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## User Interface Features

### Dashboard Matching Figma Wireframe

✅ **Layout Match:**
- Left sidebar with navigation
- Top metrics panel with 4 KPI cards
- Main content area with tabs
- Chat panel on the right side

✅ **Visual Design:**
- Purple/indigo gradient theme
- Card-based layout with shadows
- Smooth animations and transitions
- Responsive mobile layout
- Color-coded performance indicators

✅ **Interactive Elements:**
- Tab switching with smooth transitions
- Hoverable cards with depth effects
- Loading animations
- Suggested quick actions
- Copy/download functionality

### Responsive Design

- **Desktop:** Full layout with sidebar and chat panel
- **Tablet:** Collapsible sidebar, responsive grid
- **Mobile:** Stacked layout, hamburger menu

---

## Performance Characteristics

### Response Times
- **Chat (Llama):** 1-3 seconds typical
- **Insights (Claude):** 3-5 seconds typical
- **Reports (Claude):** 5-10 seconds typical
- **Analytics Query:** <100ms

### Scaling
- Handles 420+ articles without performance degradation
- Session management: Up to 20 messages per session
- Concurrent users: Limited by Bedrock API quotas

---

## Security Features

✅ **Environment Management:** AWS credentials in .env (not committed)
✅ **CORS Configuration:** Restricted to specified origins
✅ **Input Validation:** Query and message validation
✅ **Error Handling:** Graceful fallbacks for API failures
✅ **Session Isolation:** Per-session conversation context
✅ **Data Privacy:** No sensitive data stored in frontend

---

## Integration Points

### With AWS Bedrock

- **Model Invocation:** Direct API calls to Claude and Llama models
- **Error Handling:** Fallback responses when Bedrock unavailable
- **Configuration:** Environment-based model selection
- **Cost Optimization:** Token usage optimized per model

### Frontend-Backend Communication

- **REST API:** JSON over HTTP
- **CORS:** Cross-origin requests allowed
- **Session Management:** SessionId for conversation tracking
- **Polling:** Asynchronous request-response pattern

---

## Extension Points

### Adding New Features

1. **New Dashboard Tab**
   - Add component file
   - Import in Dashboard.js
   - Add navigation item to Sidebar

2. **New Agent Tool**
   - Add function to bedrockAgent.js
   - Expose via route in server.js
   - Create UI component

3. **New Report Type**
   - Add generator function
   - Expose via endpoint
   - Create panel component

---

## Future Roadmap

### Phase 1: Data Integration
- Connect to real database (PostgreSQL)
- Implement data persistence
- Add filters and search functionality

### Phase 2: Authentication
- User login (Auth0/Cognito)
- Multi-tenant support
- Role-based access control

### Phase 3: Real-Time Features
- WebSocket connections
- Live data updates
- Real-time notifications

### Phase 4: Advanced Analytics
- ChartJS for advanced visualizations
- Custom dashboard creation
- Data export (PDF, CSV, Excel)

### Phase 5: Mobile App
- React Native version
- Native mobile notifications
- Offline support

---

## Summary of Key Numbers

| Metric | Value |
|--------|-------|
| Articles in Database | 420 |
| Content Topics | 8 |
| Authors | 20 |
| Historical Data | 90 days |
| AI Models | 2 (Claude + Llama) |
| Dashboard Tabs | 4 |
| Sidebar Navigation Items | 8 |
| API Endpoints | 7 |
| Components | 9 |
| CSS Files | 8 |

---

**ContentPulse v1.0 - Complete AI-powered content analytics platform with AWS Bedrock integration**
