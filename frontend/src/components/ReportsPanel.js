import React, { useState } from 'react';
import '../styles/ReportsPanel.css';

function ReportsPanel({ summary }) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const generateReport = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/agent/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setReport(data.report);
    } catch (error)
      {
      console.error('Error generating report:', error);
      setReport('Unable to generate report. Please check your Bedrock connection.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!report) return;
    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `contentpulse-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="reports-panel">
      <div className="reports-header">
        <h2>Biweekly Report Generation</h2>
        <p>Generate comprehensive AI-powered reports analyzing your content performance</p>
      </div>

      <div className="report-actions">
        <button
          onClick={generateReport}
          disabled={loading}
          className={`generate-report-btn ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Generating Report...' : 'Generate Biweekly Report'}
        </button>
        {report && (
          <button onClick={downloadReport} className="download-btn">
            📥 Download Report
          </button>
        )}
      </div>

      {report && (
        <div className="report-content">
          <h3>Generated Report</h3>
          <div className="report-text">
            {report.split('\n').map((line, index) => (
              <p key={index}>{line || <br />}</p>
            ))}
          </div>
        </div>
      )}

      <div className="report-templates">
        <h3>Report Information</h3>
        <div className="info-cards">
          <div className="info-card">
            <h4>📊 What's Included</h4>
            <ul>
              <li>Executive Summary</li>
              <li>Key Performance Metrics</li>
              <li>Top Performing Topics</li>
              <li>Trend Analysis</li>
              <li>Actionable Recommendations</li>
            </ul>
          </div>
          <div className="info-card">
            <h4>📈 Current Period Stats</h4>
            <ul>
              <li>Total Articles: {summary.totalArticles}</li>
              <li>Total Views: {summary.totalViews.toLocaleString()}</li>
              <li>Conversions: {summary.totalConversions}</li>
              <li>Avg Engagement: {summary.avgEngagementRate}%</li>
              <li>Top Topic: {summary.topTopics[0].topic}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPanel;
