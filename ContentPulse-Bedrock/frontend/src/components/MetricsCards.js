import React from 'react';
import '../styles/MetricsCards.css';

function MetricsCards({ data }) {
  const metrics = [
    {
      label: 'Total Articles',
      value: data.summary.totalArticles,
      icon: '📰',
      color: 'blue',
    },
    {
      label: 'Avg. Engagement Rate',
      value: `${data.summary.avgEngagement.toFixed(2)}%`,
      icon: '📈',
      color: 'green',
    },
    {
      label: 'Conversions',
      value: data.summary.totalConversions.toLocaleString(),
      icon: '✅',
      color: 'purple',
    },
    {
      label: 'Total Views',
      value: (data.summary.totalViews / 1000).toFixed(0) + 'K',
      icon: '👁️',
      color: 'orange',
    },
  ];

  return (
    <div className="metrics-container">
      {metrics.map((metric, index) => (
        <div key={index} className={`metric-card ${metric.color}`}>
          <div className="metric-icon">{metric.icon}</div>
          <div className="metric-content">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MetricsCards;
