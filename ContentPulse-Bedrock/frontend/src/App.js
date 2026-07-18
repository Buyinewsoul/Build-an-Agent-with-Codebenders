import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar.js';
import Dashboard from './components/Dashboard.js';
import ChatPanel from './components/ChatPanel.js';
import ReportsPanel from './components/ReportsPanel.js';
import './styles/App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [reportContent, setReportContent] = useState(null);

  // Fetch analytics data on mount
  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/analytics/data`);
      setAnalyticsData(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError('Failed to load analytics data. Make sure backend is running.');
      setAnalyticsData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChatMessage = async (message) => {
    setChatMessages([...chatMessages, { role: 'user', content: message }]);
    try {
      // Build conversation context from previous messages
      const conversationContext = chatMessages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      // Send message with full conversation context
      const response = await axios.post(`${API_BASE_URL}/agent/chat`, { 
        message,
        context: conversationContext 
      });
      if (response.data.success) {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: response.data.message }]);
      } else {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: 'Error processing message' }]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages((prev) => [...prev, { role: 'assistant', content: 'Failed to get response' }]);
    }
  };

  const handleGenerateReport = async (reportType) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/agent/report`, { reportType });
      if (response.data.success) {
        setReportContent({
          type: reportType,
          content: response.data.report,
          generatedAt: response.data.generatedAt,
          reportId: response.data.reportId,
        });
        setActiveTab('reports');
      }
    } catch (err) {
      console.error('Report generation error:', err);
    }
  };

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        {loading && <div className="loading">Loading analytics data...</div>}
        {error && <div className="error">{error}</div>}
        
        {!loading && analyticsData && (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                data={analyticsData}
                onGenerateReport={handleGenerateReport}
              />
            )}
            {activeTab === 'chat' && (
              <ChatPanel
                messages={chatMessages}
                onSendMessage={handleChatMessage}
              />
            )}
            {activeTab === 'reports' && (
              <ReportsPanel
                reportContent={reportContent}
                onGenerateReport={handleGenerateReport}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
