import React, { useState } from 'react';
import '../styles/InsightsPanel.css';

function InsightsPanel({ summary }) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [query, setQuery] = useState('Generate overall content performance insights');

  const generateInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/agent/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      console.error('Error generating insights:', error);
      setInsights('Unable to generate insights. Please check your Bedrock connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="insights-panel">
      <div className="insights-form">
        <div className="form-group">
          <label htmlFor="query">What insights would you like?</label>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Generate insights on AI content performance"
            className="query-input"
          />
        </div>
        <button
          onClick={generateInsights}
          disabled={loading}
          className={`generate-btn ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Generating...' : 'Generate Insights with Claude'}
        </button>
      </div>

      {insights && (
        <div className="insights-result">
          <h3>AI-Generated Insights</h3>
          <div className="insights-content">
            {insights.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}

      <div className="quick-stats">
        <h3>Quick Performance Summary</h3>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-icon">📊</span>
            <span className="stat-value">{summary.totalArticles}</span>
            <span className="stat-label">Total Articles</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">👁️</span>
            <span className="stat-value">{(summary.totalViews / 1000).toFixed(0)}K</span>
            <span className="stat-label">Total Views</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">💬</span>
            <span className="stat-value">{summary.avgEngagementRate.toFixed(1)}%</span>
            <span className="stat-label">Avg Engagement</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">{summary.topTopics[0].topic}</span>
            <span className="stat-label">Top Topic</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightsPanel;
