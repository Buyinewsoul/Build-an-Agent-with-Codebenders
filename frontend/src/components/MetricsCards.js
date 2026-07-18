import React from 'react';
import '../styles/MetricsCards.css';

function MetricsCards({ summary }) {
  const cards = [
    {
      label: 'Total Articles',
      value: summary.totalArticles.toLocaleString(),
      icon: '📄',
      color: '#3498db',
    },
    {
      label: 'Total Views',
      value: (summary.totalViews / 1000).toFixed(0) + 'K',
      icon: '👁️',
      color: '#2ecc71',
    },
    {
      label: 'Avg Engagement',
      value: summary.avgEngagementRate.toFixed(1) + '%',
      icon: '💬',
      color: '#e74c3c',
    },
    {
      label: 'Total Conversions',
      value: summary.totalConversions.toLocaleString(),
      icon: '✨',
      color: '#f39c12',
    },
  ];

  return (
    <div className="metrics-cards">
      {cards.map((card, index) => (
        <div key={index} className="metric-card" style={{ borderTopColor: card.color }}>
          <div className="metric-icon">{card.icon}</div>
          <div className="metric-content">
            <p className="metric-label">{card.label}</p>
            <p className="metric-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MetricsCards;
