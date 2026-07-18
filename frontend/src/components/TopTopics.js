import React from 'react';
import '../styles/TopTopics.css';

function TopTopics({ topics }) {
  return (
    <div className="top-topics">
      <h2>Top Performing Topics</h2>
      <div className="topics-list">
        {topics.map((topic, index) => (
          <div key={index} className="topic-item">
            <div className="topic-rank">{index + 1}</div>
            <div className="topic-details">
              <h3 className="topic-name">{topic.topic}</h3>
              <p className="topic-stats">
                {topic.totalViews.toLocaleString()} views • {topic.avgEngagement}% avg engagement
              </p>
            </div>
            <div className="topic-metric">
              <span className="topic-conversions">{topic.totalConversions}</span>
              <span className="metric-label">conversions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTopics;
