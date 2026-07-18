import { invokeClaudeModel, invokeLlamaModel } from "./config.js";
import { getAnalyticsData, queryArticles } from "./mockData.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Query analytics data with optional filters
 */
export async function toolQueryAnalytics(params) {
  try {
    const filters = params.filters || {};
    const results = queryArticles(filters);
    return {
      success: true,
      data: results,
      count: results.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generate insights using Claude 4.5 Sonnet
 */
export async function toolGenerateInsights(params) {
  try {
    const analyticsData = getAnalyticsData();
    const prompt = params.query || "Analyze the content performance and identify key insights";

    const systemPrompt = `You are an expert content analyst. Analyze the following content analytics data and provide actionable insights. Be specific, data-driven, and concise. Format your response with clear sections and bullet points.`;

    const userMessage = `${prompt}\n\nHere's the analytics data:\n${JSON.stringify(analyticsData, null, 2)}`;

    const response = await invokeClaudeModel(userMessage, systemPrompt);

    return {
      success: true,
      insights: response,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generate report using Claude 4.5 Sonnet
 */
export async function toolGenerateReport(params) {
  try {
    const reportType = params.reportType || "summary";
    const analyticsData = getAnalyticsData();

    const prompts = {
      summary:
        "Generate a comprehensive summary report of content performance including top topics, engagement trends, and recommendations.",
      detailed:
        "Create a detailed analysis report covering all metrics, topic breakdowns, performance trends over time, and strategic recommendations.",
      executive:
        "Create an executive summary report with key KPIs, top performers, risk areas, and strategic opportunities for content optimization.",
    };

    const selectedPrompt = prompts[reportType] || prompts.summary;

    const systemPrompt = `You are a content strategy expert. Generate a professional report based on the provided analytics data. Use clear structure with headings, sections, and actionable recommendations.`;

    const userMessage = `${selectedPrompt}\n\nAnalytics Data:\n${JSON.stringify(analyticsData, null, 2)}`;

    const response = await invokeClaudeModel(userMessage, systemPrompt);

    return {
      success: true,
      reportType: reportType,
      report: response,
      generatedAt: new Date().toISOString(),
      reportId: uuidv4(),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Process conversational chat with Claude for better context understanding
 */
export async function toolChatConversation(params) {
  try {
    const userMessage = params.message;
    const context = params.context || "";

    // Build comprehensive prompt with conversation history
    const conversationContext = context
      ? `Conversation history:\n${context}\n\nCurrent message:`
      : "";

    const systemPrompt = `You are a helpful ContentPulse AI Assistant. You help users understand their content analytics, performance metrics, and provide recommendations for improvement. 
    
You have access to their analytics data and can discuss:
- Content performance metrics (views, engagement, conversions)
- Topic analysis and trends
- Author performance
- Strategic recommendations for content optimization

Keep responses concise, data-driven, and actionable. Remember the conversation context and refer back to previous messages when relevant.`;

    const fullMessage = `${conversationContext}
${userMessage}

Remember to maintain context from our conversation and provide personalized recommendations based on what we've discussed.`;

    // Use Claude instead of Llama for better contextual understanding
    const response = await invokeClaudeModel(fullMessage, systemPrompt);

    return {
      success: true,
      message: response.trim(),
      error: error.message,
    };
  }
}

/**
 * Main agent processor that routes requests to appropriate tools
 */
export async function processAgentRequest(action, params) {
  console.log(`Processing agent action: ${action}`, params);

  switch (action) {
    case "queryAnalytics":
      return await toolQueryAnalytics(params);
    case "generateInsights":
      return await toolGenerateInsights(params);
    case "generateReport":
      return await toolGenerateReport(params);
    case "chat":
      return await toolChatConversation(params);
    default:
      return {
        success: false,
        error: `Unknown action: ${action}`,
      };
  }
}

/**
 * Enhanced agent that processes multi-step requests
 */
export async function processComplexRequest(userRequest) {
  try {
    const systemPrompt = `You are a content analytics agent. Analyze the user request and determine what actions to take. Respond with a JSON object containing:
    {
      "primaryAction": "queryAnalytics|generateInsights|generateReport|chat",
      "parameters": { /* relevant parameters */ },
      "explanation": "Brief explanation of what you're doing"
    }`;

    const planResponse = await invokeClaudeModel(userRequest, systemPrompt);

    let plan;
    try {
      const jsonMatch = planResponse.match(/\{[\s\S]*\}/);
      plan = JSON.parse(jsonMatch ? jsonMatch[0] : planResponse);
    } catch (e) {
      return {
        success: true,
        type: "response",
        content: planResponse,
      };
    }

    const result = await processAgentRequest(
      plan.primaryAction,
      plan.parameters || {}
    );

    return {
      success: true,
      plan: plan.explanation,
      result: result,
    };
  } catch (error) {
    console.error("Complex request error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default {
  processAgentRequest,
  processComplexRequest,
  toolQueryAnalytics,
  toolGenerateInsights,
  toolGenerateReport,
  toolChatConversation,
};
