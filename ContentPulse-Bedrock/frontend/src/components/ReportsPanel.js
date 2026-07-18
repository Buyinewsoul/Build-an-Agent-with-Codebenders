import React from 'react';
import '../styles/ReportsPanel.css';

function ReportsPanel({ reportContent, onGenerateReport }) {
  const reportTypeLabels = {
    summary: '📋 Summary Report',
    detailed: '📊 Detailed Report',
    executive: '👔 Executive Summary',
  };

  return (
    <div className="reports-panel">
      <div className="reports-header">
        <h1>📄 Reports</h1>
        <p>Generate comprehensive content analytics reports powered by AI</p>
      </div>

      <div className="report-options">
        <button
          className="report-option-button"
          onClick={() => onGenerateReport('summary')}
        >
          <div className="option-icon">📋</div>
          <div className="option-content">
            <h4>Summary Report</h4>
            <p>Quick overview of key metrics and top performers</p>
          </div>
        </button>

        <button
          className="report-option-button"
          onClick={() => onGenerateReport('detailed')}
        >
          <div className="option-icon">📊</div>
          <div className="option-content">
            <h4>Detailed Report</h4>
            <p>Comprehensive analysis with trends and breakdowns</p>
          </div>
        </button>

        <button
          className="report-option-button"
          onClick={() => onGenerateReport('executive')}
        >
          <div className="option-icon">👔</div>
          <div className="option-content">
            <h4>Executive Summary</h4>
            <p>Strategic insights and recommendations for leadership</p>
          </div>
        </button>
      </div>

      {reportContent && (
        <div className="report-display">
          <div className="report-meta">
            <h2>{reportTypeLabels[reportContent.type]}</h2>
            <div className="report-info">
              <span className="report-id">ID: {reportContent.reportId}</span>
              <span className="report-date">
                Generated: {new Date(reportContent.generatedAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="report-content">
            {reportContent.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="report-text">
                  {paragraph}
                </p>
              )
            ))}
          </div>

          <div className="report-actions">
            <button className="action-button download">
              ⬇️ Download PDF
            </button>
            <button className="action-button share">
              📤 Share Report
            </button>
            <button className="action-button print">
              🖨️ Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsPanel;
