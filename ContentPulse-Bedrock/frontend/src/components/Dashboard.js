import React from 'react';
import MetricsCards from './MetricsCards.js';
import PerformanceTrend from './PerformanceTrend.js';
import TopTopics from './TopTopics.js';
import InsightsPanel from './InsightsPanel.js';
import '../styles/Dashboard.css';

function Dashboard({ data, onGenerateReport }) {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <div className="header-actions">
          <button
            className="report-button summary"
            onClick={() => onGenerateReport('summary')}
          >
            📋 Summary Report
          </button>
          <button
            className="report-button detailed"
            onClick={() => onGenerateReport('detailed')}
          >
            📊 Detailed Report
          </button>
          <button
            className="report-button executive"
            onClick={() => onGenerateReport('executive')}
          >
            👔 Executive Report
          </button>
        </div>
      </div>

      <MetricsCards data={data} />

      <div className="dashboard-grid">
        <div className="grid-item full">
          <PerformanceTrend data={data} />
        </div>

        <div className="grid-item half">
          <TopTopics data={data} />
        </div>

        <div className="grid-item half">
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
