import React from 'react';
import '../styles/TopTopics.css';

function TopTopics({ data }) {
  const topicEntries = Object.entries(data.topicBreakdown).map(([topic, stats]) => ({
    topic,
    ...stats,
  }));

  const sortedTopics = topicEntries.sort((a, b) => b.totalViews - a.totalViews);

  return (
    <div className="top-topics">
      <h3 className="section-title">Top Performing Topics</h3>
      <div className="topics-list">
        {sortedTopics.map((topic, index) => (
          <div key={index} className="topic-item">
            <div className="topic-rank">{index + 1}</div>
            <div className="topic-info">
              <div className="topic-name">{topic.topic}</div>
              <div className="topic-stats">
                <span className="stat">{topic.count} articles</span>
                <span className="stat separator">•</span>
                <span className="stat">{topic.totalViews.toLocaleString()} views</span>
              </div>
            </div>
            <div className="topic-engagement">
              <div className="engagement-badge">{topic.avgEngagement}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTopics;
