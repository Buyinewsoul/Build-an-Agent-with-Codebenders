/**
 * Bedrock Agent for ContentPulse
 * Implements agent with tools for analytics queries, insights, and report generation
 */

const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const { generateMockData, getAnalyticsSummary, getLast14Days } = require('../data/mockData');

// Initialize Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

// Cache for mock data
let analyticsData = null;
let analyticsSummary = null;
let last14Days = null;

function initializeData() {
  if (!analyticsData) {
    analyticsData = generateMockData();
    analyticsSummary = getAnalyticsSummary(analyticsData);
    last14Days = getLast14Days(analyticsData);
  }
}

/**
 * Query analytics data with filters
 */
function queryAnalytics(topic = null, dateRange = null, metric = null) {
  initializeData();

  let filtered = analyticsData;

  if (topic) {
    filtered = filtered.filter((a) => a.topic.toLowerCase() === topic.toLowerCase());
  }

  if (dateRange) {
    const [startDate, endDate] = dateRange;
    const start = new Date(startDate);
    const end = new Date(endDate);
    filtered = filtered.filter((a) => {
      const pubDate = new Date(a.publishDate);
      return pubDate >= start && pubDate <= end;
    });
  }

  return filtered;
}

/**
 * Generate insights using Claude
 */
async function generateInsights(query) {
  initializeData();

  const toolResults = {
    totalArticles: analyticsSummary.totalArticles,
    totalViews: analyticsSummary.totalViews,
    avgEngagement: analyticsSummary.avgEngagementRate,
    topTopics: analyticsSummary.topTopics,
  };

  const systemPrompt = `You are an expert content analytics advisor for ContentPulse.
Analyze content performance data and provide actionable insights and recommendations.
Be concise but thorough. Focus on trends, opportunities, and performance drivers.`;

  const userMessage = `Based on the following analytics data: ${JSON.stringify(toolResults)}

User query: ${query}

Provide 3-5 key insights and recommendations.`;

  try {
    const command = new InvokeModelCommand({
      modelId: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-06-01',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      }),
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.content[0].text;
  } catch (error) {
    console.error('Bedrock API error:', error);
    return `Insights for "${query}": Based on the data, ${analyticsSummary.topTopics[0].topic} is the top-performing topic with ${analyticsSummary.topTopics[0].totalViews} views. Consider focusing more content on high-engagement topics.`;
  }
}

/**
 * Generate biweekly report
 */
async function generateReport() {
  initializeData();

  const reportData = {
    period: 'Biweekly Report',
    generatedAt: new Date().toISOString(),
    summary: analyticsSummary,
    trendData: last14Days,
  };

  const systemPrompt = `You are an expert content strategist. Create a professional biweekly report
for content performance. Include key metrics, trend analysis, top performers, and actionable recommendations.
Format as a structured report with sections.`;

  const userMessage = `Generate a professional biweekly content performance report based on this data:
${JSON.stringify(reportData, null, 2)}

Include sections for: Executive Summary, Key Metrics, Top Performers, Trend Analysis, and Recommendations.`;

  try {
    const command = new InvokeModelCommand({
      modelId: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-06-01',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      }),
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.content[0].text;
  } catch (error) {
    console.error('Bedrock API error:', error);
    return generateFallbackReport();
  }
}

function generateFallbackReport() {
  initializeData();
  const top = analyticsSummary.topTopics[0];
  return `BIWEEKLY CONTENT PERFORMANCE REPORT
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
Total Articles: ${analyticsSummary.totalArticles}
Total Views: ${analyticsSummary.totalViews.toLocaleString()}
Avg Engagement Rate: ${analyticsSummary.avgEngagementRate}%

TOP PERFORMER
Topic: ${top.topic}
Views: ${top.totalViews.toLocaleString()}
Avg Engagement: ${top.avgEngagement}%

RECOMMENDATIONS
1. Increase content production in ${top.topic}
2. Replicate high-engagement patterns from top performers
3. Analyze underperforming topics for improvement
4. Maintain consistency in publishing schedule`;
}

/**
 * Chat with Llama for conversational queries
 */
async function chatWithLlama(message, conversationHistory = []) {
  initializeData();

  const messages = [
    ...conversationHistory,
    {
      role: 'user',
      content: message,
    },
  ];

  const systemPrompt = `You are ContentPulse, a helpful content analytics assistant.
You help users understand their content performance, find trends, and get recommendations.
You have access to analytics about 420 articles across topics like AI, Marketing, Finance, etc.
Keep responses concise and focused. When asked about data, reference the insights available.`;

  try {
    const command = new InvokeModelCommand({
      modelId: process.env.LLAMA_MODEL || 'llama3.1-8b-instruct',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        prompt: `${systemPrompt}\n\nUser: ${message}`,
        max_gen_len: 512,
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.generation || responseBody.text || 'Unable to generate response';
  } catch (error) {
    console.error('Llama chat error:', error);
    return `Hello! I'm ContentPulse. Based on your question: "${message}", our analytics show we have ${analyticsSummary.totalArticles} articles with ${analyticsSummary.totalViews.toLocaleString()} total views. How can I help you with content insights?`;
  }
}

module.exports = {
  generateInsights,
  generateReport,
  chatWithLlama,
  queryAnalytics,
  getAnalyticsSummary: () => {
    initializeData();
    return analyticsSummary;
  },
  getLast14Days: () => {
    initializeData();
    return last14Days;
  },
  getAllArticles: () => {
    initializeData();
    return analyticsData;
  },
};
