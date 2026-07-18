import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { processAgentRequest, processComplexRequest } from "./bedrockAgent.js";
import { getAnalyticsData } from "./mockData.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/**
 * Health check endpoint
 */
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

/**
 * Get all analytics data
 */
app.get("/analytics/data", (req, res) => {
  try {
    const data = getAnalyticsData();
    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Chat endpoint - conversational interface
 * POST /agent/chat
 * Body: { message: string, context?: string }
 */
app.post("/agent/chat", async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    const result = await processAgentRequest("chat", {
      message: message,
      context: context,
    });

    res.json(result);
  } catch (error) {
    console.error("Chat endpoint error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Generate insights endpoint
 * POST /agent/insights
 * Body: { query?: string }
 */
app.post("/agent/insights", async (req, res) => {
  try {
    const { query } = req.body;

    const result = await processAgentRequest("generateInsights", {
      query: query,
    });

    res.json(result);
  } catch (error) {
    console.error("Insights endpoint error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Generate report endpoint
 * POST /agent/report
 * Body: { reportType?: "summary" | "detailed" | "executive" }
 */
app.post("/agent/report", async (req, res) => {
  try {
    const { reportType = "summary" } = req.body;

    const result = await processAgentRequest("generateReport", {
      reportType: reportType,
    });

    res.json(result);
  } catch (error) {
    console.error("Report endpoint error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Complex agent request endpoint
 * POST /agent/request
 * Body: { request: string }
 */
app.post("/agent/request", async (req, res) => {
  try {
    const { request } = req.body;

    if (!request) {
      return res.status(400).json({
        success: false,
        error: "Request is required",
      });
    }

    const result = await processComplexRequest(request);

    res.json(result);
  } catch (error) {
    console.error("Complex request endpoint error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Query analytics with filters
 * POST /agent/query
 * Body: { filters?: { topic?: string, minViews?: number, minEngagement?: number } }
 */
app.post("/agent/query", async (req, res) => {
  try {
    const { filters } = req.body;

    const result = await processAgentRequest("queryAnalytics", {
      filters: filters,
    });

    res.json(result);
  } catch (error) {
    console.error("Query endpoint error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 ContentPulse Bedrock Agent Backend running on http://localhost:${PORT}`);
  console.log("📊 Health check: GET /health");
  console.log("📈 Analytics data: GET /analytics/data");
  console.log("💬 Chat: POST /agent/chat");
  console.log("🔍 Insights: POST /agent/insights");
  console.log("📄 Report: POST /agent/report");
  console.log("🤖 Complex request: POST /agent/request");
  console.log("🔎 Query analytics: POST /agent/query");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n👋 Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

export default app;
