import React from 'react';
import '../styles/PerformanceTrend.css';

function PerformanceTrend({ data }) {
  if (!data || data.length === 0) {
    return <div className="trend-loading">Loading trend data...</div>;
  }

  const maxViews = Math.max(...data.map((d) => d.views));
  const normalizeHeight = (value) => (value / maxViews) * 100;

  return (
    <div className="performance-trend">
      <h2>Performance Trend (Last 14 Days)</h2>
      <div className="chart-container">
        <div className="chart">
          {data.map((day, index) => (
            <div key={index} className="chart-bar-group">
              <div className="bar-container">
                <div
                  className="bar views-bar"
                  style={{ height: `${normalizeHeight(day.views)}%` }}
                  title={`${day.date}: ${day.views} views`}
                />
              </div>
              <span className="date-label">{day.date.slice(-2)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#3498db' }} />
          <span>Views</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#2ecc71' }} />
          <span>Engagement</span>
        </div>
      </div>
    </div>
  );
}

export default PerformanceTrend;
