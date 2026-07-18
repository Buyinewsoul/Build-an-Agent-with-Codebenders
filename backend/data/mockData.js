/**
 * Mock data generator for ContentPulse
 * Generates 420 articles with engagement metrics, topics, and timestamps
 */

const TOPICS = ['AI', 'Marketing', 'Finance', 'Cybersecurity', 'Productivity', 'Cloud', 'DevOps', 'Web3'];

function generateMockData() {
  const articles = [];
  const baseDate = new Date('2024-12-01');

  for (let i = 0; i < 420; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const publishDate = new Date(baseDate);
    publishDate.setDate(publishDate.getDate() - daysAgo);

    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const views = Math.floor(Math.random() * 50000) + 1000;
    const engagementRate = (Math.random() * 15 + 2).toFixed(1);
    const conversions = Math.floor(views * (engagementRate / 100) * 0.3);

    articles.push({
      id: `article-${i + 1}`,
      title: `${topic} Insights #${i + 1}`,
      topic,
      views,
      engagementRate: parseFloat(engagementRate),
      conversions,
      publishDate: publishDate.toISOString(),
      author: `Author ${(i % 20) + 1}`,
    });
  }

  return articles;
}

function getAnalyticsSummary(articles) {
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const totalConversions = articles.reduce((sum, a) => sum + a.conversions, 0);
  const avgEngagement = (articles.reduce((sum, a) => sum + a.engagementRate, 0) / articles.length).toFixed(1);

  const topicPerformance = {};
  articles.forEach((article) => {
    if (!topicPerformance[article.topic]) {
      topicPerformance[article.topic] = {
        topic: article.topic,
        totalViews: 0,
        totalConversions: 0,
        avgEngagement: 0,
        count: 0,
      };
    }
    topicPerformance[article.topic].totalViews += article.views;
    topicPerformance[article.topic].totalConversions += article.conversions;
    topicPerformance[article.topic].avgEngagement += article.engagementRate;
    topicPerformance[article.topic].count += 1;
  });

  Object.keys(topicPerformance).forEach((topic) => {
    topicPerformance[topic].avgEngagement = (
      topicPerformance[topic].avgEngagement / topicPerformance[topic].count
    ).toFixed(1);
  });

  const topTopics = Object.values(topicPerformance)
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 5);

  return {
    totalArticles: articles.length,
    totalViews,
    totalConversions,
    avgEngagementRate: parseFloat(avgEngagement),
    topTopics,
    topicPerformance,
  };
}

function getLast14Days(articles) {
  const last14 = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const dayArticles = articles.filter((a) => {
      const articleDate = new Date(a.publishDate);
      articleDate.setHours(0, 0, 0, 0);
      return articleDate.getTime() === date.getTime();
    });

    last14.unshift({
      date: date.toISOString().split('T')[0],
      views: dayArticles.reduce((sum, a) => sum + a.views, 0),
      engagement: (
        dayArticles.reduce((sum, a) => sum + a.engagementRate, 0) / (dayArticles.length || 1)
      ).toFixed(1),
      conversions: dayArticles.reduce((sum, a) => sum + a.conversions, 0),
    });
  }
  return last14;
}

module.exports = {
  generateMockData,
  getAnalyticsSummary,
  getLast14Days,
};
