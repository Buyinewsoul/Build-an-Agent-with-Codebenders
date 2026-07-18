# ContentPulse Architecture Documentation

## System Overview

ContentPulse is a multi-tier AI-powered content analytics platform built with:
- **Frontend**: React dashboard with real-time UI
- **Backend**: Express.js REST API with AWS Bedrock integration
- **Data**: Mock analytics generator with 420 articles
- **AI**: Claude 3.5 Sonnet (analysis/reports) + Llama 3.1 (chat)

## Component Architecture

### Backend Layer

#### 1. Express Server (`backend/src/server.js`)
- REST API with CORS support
- Route handlers for analytics, chat, insights, reports
- Session management for conversation history
- Error handling and logging

**Key Routes:**
- `GET /health` - Service health
- `GET /analytics/*` - Data retrieval
- `POST /agent/chat` - Llama chat
- `POST /agent/insights` - Claude analysis
- `POST /agent/report` - Report generation

#### 2. Bedrock Agent (`backend/src/bedrockAgent.js`)
- AWS Bedrock client initialization
- Tool implementations:
  - `queryAnalytics()` - Filter/search data
  - `generateInsights()` - Claude analysis
  - `generateReport()` - Biweekly reports
  - `chatWithLlama()` - Conversational responses
- Fallback responses for non-production use

#### 3. Mock Data (`backend/data/mockData.js`)
- Generates 420 articles with:
  - Random topics (8 types)
  - Realistic metrics (views, engagement, conversions)
  - Date distribution (90-day window)
  - Author rotation (20 authors)
- Analysis functions:
  - `getAnalyticsSummary()` - Aggregated metrics
  - `getLast14Days()` - Trend data
  - `generateMockData()` - Fresh dataset

### Frontend Layer

#### 1. Main App (`frontend/src/App.js`)
- Root component with view routing
- Data fetching on mount
- View state management

#### 2. Sidebar Navigation (`frontend/src/components/Sidebar.js`)
- 8 navigation items
- Active view highlighting
- Responsive mobile menu

#### 3. Dashboard (`frontend/src/components/Dashboard.js`)
- Tab-based interface:
  - Overview: Metrics + trends
  - Performance: Detailed charts + table
  - Insights: AI analysis panel
  - Reports: Report generation
- Data aggregation and display

#### 4. Chat Panel (`frontend/src/components/ChatPanel.js`)
- Real-time message display
- Auto-scrolling conversation
- Session-based history
- Suggested quick questions
- Loading states and animations

#### 5. Component Library
- `MetricsCards.js` - KPI display
- `PerformanceTrend.js` - 14-day chart
- `TopTopics.js` - Ranked topics
- `InsightsPanel.js` - Claude analysis UI
- `ReportsPanel.js` - Report generation UI

### Styling Architecture

#### CSS Cascade
1. **Global** (`App.css`) - Layout, sidebar, navigation
2. **Dashboard** (`Dashboard.css`) - Tabs, grids, tables
3. **Component-specific** - Individual styling per component

#### Design System
- **Colors**: Gradient purple (#667eea → #764ba2)
- **Spacing**: Rem-based (1.5rem base unit)
- **Shadows**: Multi-layer depth
- **Animations**: Smooth transitions and keyframes

## Data Flow

### Analytics Data Flow
```
MockData Generator
    ↓
Backend Cache (in-memory)
    ↓
Express Routes (/analytics/*)
    ↓
Frontend (fetch)
    ↓
Dashboard Components
    ↓
User View
```

### Chat Flow
```
User Input
    ↓
ChatPanel Component
    ↓
POST /agent/chat
    ↓
Backend Session Manager
    ↓
Llama 3.1 via Bedrock
    ↓
Response Message
    ↓
Message History
    ↓
Component Re-render
```

### Insights Flow
```
User Query
    ↓
InsightsPanel Component
    ↓
POST /agent/insights
    ↓
Analytics Summary
    ↓
Claude 3.5 Sonnet
    ↓
AI-Generated Insights
    ↓
Component Display
```

### Report Flow
```
User Trigger
    ↓
ReportsPanel Component
    ↓
POST /agent/report
    ↓
Full Analytics Data
    ↓
Claude 3.5 Sonnet
    ↓
Structured Report
    ↓
Display + Download
```

## API Contract

### Request/Response Examples

#### Chat Endpoint
```
POST /agent/chat
{
  "message": "What's our top topic?",
  "sessionId": "session-123"
}
→ {
  "response": "Based on analytics...",
  "sessionId": "session-123",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Insights Endpoint
```
POST /agent/insights
{
  "query": "Generate insights"
}
→ {
  "query": "Generate insights",
  "insights": "Based on the data...",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Analytics Endpoint
```
GET /analytics/data
→ {
  "summary": {
    "totalArticles": 420,
    "totalViews": 8234567,
    "avgEngagementRate": 8.6,
    "totalConversions": 310,
    "topTopics": [...]
  },
  "last14Days": [...],
  "articles": [...]
}
```

## State Management

### Backend State
- **Analytics Cache**: Singleton pattern, lazy-loaded
- **Chat History**: Map of sessionId → messages
- **Session Lifetime**: Request-scoped, history limited to 20 messages

### Frontend State
- **App Level**: activeView, analyticsData, loading
- **Component Level**: Local state (messages, input, loading flags)
- **No Redux/Context**: Simple prop drilling for small app

## Bedrock Integration

### Model Selection
- **Claude 3.5 Sonnet**: 
  - Advanced reasoning and analysis
  - Used for insights and reports
  - Max tokens: 1024-2048
  
- **Llama 3.1 8B**:
  - Fast conversational responses
  - Used for real-time chat
  - Max tokens: 512

### Error Handling
- Try-catch around API calls
- Fallback responses for non-prod
- Error logging to console
- User-friendly error messages

## Performance Optimization

### Frontend
- CSS gradients (GPU accelerated)
- React component memoization ready
- Minimal re-renders with state structure
- Lazy loading for large lists

### Backend
- In-memory data caching
- Single Bedrock client instance
- Connection pooling (via SDK)
- Limited chat history (20 messages)

### Network
- CORS pre-flight optimization
- JSON compression ready
- API response caching potential

## Security Considerations

### Environment
- AWS credentials in .env (not committed)
- IAM role recommended for production

### API
- CORS configured
- Input validation ready
- Rate limiting recommended

### Frontend
- No sensitive data in state
- XSS protection via React escaping
- CSRF tokens ready for production

## Deployment Architecture

### Development
```
Frontend Dev Server :3000
├── Hot reload
├── Proxy to :3001
└── React DevTools

Backend Server :3001
├── Express
├── Bedrock API
└── Mock data
```

### Production (Docker)
```
Docker Network
├── Backend Container
│   ├── Node.js runtime
│   ├── AWS SDK
│   └── Port 3001
└── Frontend Container
    ├── Node.js/serve
    ├── Static files
    └── Port 3000
```

### Scaling
- Horizontal: Multiple backend instances with load balancer
- Vertical: Bedrock auto-scaling
- Caching: Redis for chat history
- Database: PostgreSQL for analytics

## Extension Points

### Adding New Features
1. **New Dashboard Tab**:
   - Add component to Dashboard.js
   - Add tab button
   - Import styles

2. **New Chat Tool**:
   - Add function to bedrockAgent.js
   - Expose via route in server.js
   - Add UI in ChatPanel.js

3. **New Report Type**:
   - Add generator function
   - Add endpoint in server.js
   - Add UI panel component

## Monitoring & Observability

### Logs
- Console logs for development
- CloudWatch for production
- Request/response logging

### Metrics
- API response times
- Bedrock API usage
- Chat session metrics
- Frontend performance metrics

### Debugging
- Browser DevTools
- Server console output
- Bedrock API responses
- Network tab inspection

## Future Roadmap

1. **Phase 1**: Database integration (PostgreSQL)
2. **Phase 2**: User authentication (Auth0/Cognito)
3. **Phase 3**: Real-time updates (WebSockets)
4. **Phase 4**: Advanced analytics (ChartJS, DataViz)
5. **Phase 5**: Mobile app (React Native)
