/**
 * Mock analytics data for ContentPulse
 * Contains 420 articles with realistic metrics
 */

const TOPICS = ["AI", "Marketing", "Finance", "Cybersecurity", "Productivity"];

function generateMockArticles(count = 420) {
  const articles = [];
  for (let i = 1; i <= count; i++) {
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const views = Math.floor(Math.random() * 50000) + 1000;
    const engagement_rate = (Math.random() * 15 + 1).toFixed(2);
    const conversions = Math.floor((views * parseFloat(engagement_rate)) / 100);

    articles.push({
      id: i,
      title: `${topic} Article #${i}: Key Insights and Analysis`,
      topic: topic,
      views: views,
      engagement_rate: parseFloat(engagement_rate),
      conversions: conversions,
      published_date: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
      author: `Author ${Math.floor(Math.random() * 50) + 1}`,
      status: Math.random() > 0.1 ? "published" : "draft",
    });
  }
  return articles;
}

function generateDailyMetrics() {
  const metrics = [];
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    metrics.push({
      date: date.toISOString().split("T")[0],
      views: Math.floor(Math.random() * 35000) + 10000,
      engagement: (Math.random() * 12 + 3).toFixed(2),
      conversions: Math.floor(Math.random() * 500) + 100,
    });
  }
  return metrics;
}

function getTopicStats(articles) {
  const stats = {};
  TOPICS.forEach((topic) => {
    const topicArticles = articles.filter((a) => a.topic === topic);
    stats[topic] = {
      count: topicArticles.length,
      totalViews: topicArticles.reduce((sum, a) => sum + a.views, 0),
      avgEngagement: (
        topicArticles.reduce((sum, a) => sum + a.engagement_rate, 0) /
        topicArticles.length
      ).toFixed(2),
      totalConversions: topicArticles.reduce((sum, a) => sum + a.conversions, 0),
    };
  });
  return stats;
}

export const mockArticles = generateMockArticles();
export const dailyMetrics = generateDailyMetrics();
export const topicStats = getTopicStats(mockArticles);

export function getAnalyticsData() {
  const totalArticles = mockArticles.length;
  const totalViews = mockArticles.reduce((sum, a) => sum + a.views, 0);
  const totalConversions = mockArticles.reduce((sum, a) => sum + a.conversions, 0);
  const avgEngagement = (
    mockArticles.reduce((sum, a) => sum + a.engagement_rate, 0) /
    mockArticles.length
  ).toFixed(2);

  return {
    summary: {
      totalArticles,
      totalViews,
      avgEngagement: parseFloat(avgEngagement),
      totalConversions,
    },
    topicBreakdown: topicStats,
    dailyTrend: dailyMetrics,
    topPerformingArticles: mockArticles.sort((a, b) => b.views - a.views).slice(0, 10),
    recentArticles: mockArticles.sort((a, b) => b.published_date - a.published_date).slice(0, 10),
  };
}

export function queryArticles(filters = {}) {
  let results = mockArticles;

  if (filters.topic) {
    results = results.filter((a) => a.topic === filters.topic);
  }
  if (filters.minViews) {
    results = results.filter((a) => a.views >= filters.minViews);
  }
  if (filters.minEngagement) {
    results = results.filter((a) => a.engagement_rate >= filters.minEngagement);
  }
  if (filters.status) {
    results = results.filter((a) => a.status === filters.status);
  }

  return results.slice(0, filters.limit || 20);
}

export default {
  getAnalyticsData,
  queryArticles,
  mockArticles,
  dailyMetrics,
  topicStats,
};
