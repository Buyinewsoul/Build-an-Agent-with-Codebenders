/**
 * ContentPulse Backend Server
 * Express.js API with Bedrock agent integration
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const agent = require('./bedrockAgent');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Store conversation histories per session
const conversationHistories = new Map();

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ContentPulse Bedrock Agent' });
});

/**
 * GET /analytics/data
 * Fetch mock analytics data
 */
app.get('/analytics/data', (req, res) => {
  try {
    const data = {
      summary: agent.getAnalyticsSummary(),
      last14Days: agent.getLast14Days(),
      articles: agent.getAllArticles(),
    };
    res.json(data);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

/**
 * GET /analytics/summary
 * Get quick summary
 */
app.get('/analytics/summary', (req, res) => {
  try {
    const summary = agent.getAnalyticsSummary();
    res.json(summary);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

/**
 * GET /analytics/trends
 * Get 14-day trend data
 */
app.get('/analytics/trends', (req, res) => {
  try {
    const trends = agent.getLast14Days();
    res.json(trends);
  } catch (error) {
    console.error('Error fetching trends:', error);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
});

/**
 * POST /agent/chat
 * Conversational chat using Llama
 */
app.post('/agent/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get conversation history for session
    let history = conversationHistories.get(sessionId) || [];

    // Call Llama for chat
    const response = await agent.chatWithLlama(message, history);

    // Update history
    history.push({
      role: 'user',
      content: message,
    });
    history.push({
      role: 'assistant',
      content: response,
    });

    // Keep last 10 messages in history
    if (history.length > 20) {
      history = history.slice(-20);
    }

    conversationHistories.set(sessionId, history);

    res.json({
      response,
      sessionId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

/**
 * POST /agent/insights
 * Generate insights using Claude
 */
app.post('/agent/insights', async (req, res) => {
  try {
    const { query = 'Generate overall content performance insights' } = req.body;

    const insights = await agent.generateInsights(query);

    res.json({
      query,
      insights,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Insights error:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

/**
 * POST /agent/report
 * Generate biweekly report using Claude
 */
app.post('/agent/report', async (req, res) => {
  try {
    const report = await agent.generateReport();

    res.json({
      report,
      type: 'biweekly',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Report error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

/**
 * POST /agent/query
 * Query analytics with filters
 */
app.post('/agent/query', (req, res) => {
  try {
    const { topic, dateRange, metric } = req.body;

    const results = agent.queryAnalytics(topic, dateRange, metric);

    res.json({
      query: { topic, dateRange, metric },
      results,
      count: results.length,
    });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Failed to process query' });
  }
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`ContentPulse Bedrock Agent running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Claude Model: ${process.env.CLAUDE_MODEL}`);
  console.log(`Llama Model: ${process.env.LLAMA_MODEL}`);
});
