import React, { useState } from 'react';
import '../styles/Dashboard.css';
import MetricsCards from './MetricsCards';
import PerformanceTrend from './PerformanceTrend';
import TopTopics from './TopTopics';
import InsightsPanel from './InsightsPanel';
import ReportsPanel from './ReportsPanel';

function Dashboard({ data }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!data) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  const { summary, last14Days, articles } = data;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Content Analytics Dashboard</h1>
        <p className="subtitle">AI-Powered Insights with AWS Bedrock</p>
      </header>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button
          className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
        <button
          className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="tab-content">
          <MetricsCards summary={summary} />
          <div className="dashboard-grid">
            <PerformanceTrend data={last14Days} />
            <TopTopics topics={summary.topTopics} />
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="tab-content">
          <PerformanceTrend data={last14Days} />
          <div className="articles-table">
            <h2>Recent Articles</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>Views</th>
                  <th>Engagement</th>
                  <th>Conversions</th>
                </tr>
              </thead>
              <tbody>
                {articles.slice(0, 10).map((article) => (
                  <tr key={article.id}>
                    <td className="title-cell">{article.title}</td>
                    <td><span className="topic-badge">{article.topic}</span></td>
                    <td>{article.views.toLocaleString()}</td>
                    <td>{article.engagementRate}%</td>
                    <td>{article.conversions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="tab-content">
          <InsightsPanel summary={summary} />
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="tab-content">
          <ReportsPanel summary={summary} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
