import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatPanel from './components/ChatPanel';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/analytics/data');
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading ContentPulse...</div>;
  }

  return (
    <div className="app">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="main-content">
        {activeView === 'dashboard' && <Dashboard data={analyticsData} />}
        {activeView === 'chat' && <ChatPanel />}
      </div>
    </div>
  );
}

export default App;
