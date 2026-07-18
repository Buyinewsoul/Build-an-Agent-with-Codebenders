import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/InsightsPanel.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function InsightsPanel() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/agent/insights`, {
        query: 'Analyze the content performance and identify key insights',
      });
      if (response.data.success) {
        setInsights(response.data.insights);
      }
    } catch (err) {
      console.error('Error generating insights:', err);
      setError('Failed to generate insights');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="insights-panel">
      <div className="insights-header">
        <h3>💡 AI Insights</h3>
        <button
          className="refresh-button"
          onClick={generateInsights}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Refresh'}
        </button>
      </div>

      {loading && <div className="insights-loading">Generating AI insights...</div>}

      {error && <div className="insights-error">{error}</div>}

      {insights && (
        <div className="insights-content">
          {insights.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="insight-text">
                {paragraph}
              </p>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default InsightsPanel;
