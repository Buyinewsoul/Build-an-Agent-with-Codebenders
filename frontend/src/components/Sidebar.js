import React from 'react';
import '../styles/App.css';

function Sidebar({ activeView, setActiveView }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'performance', label: 'Performance', icon: '📈' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'reports', label: 'Reports', icon: '📑' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'datasources', label: 'Data Sources', icon: '🔗' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'chat', label: 'Chat', icon: '💬' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title">ContentPulse</h1>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
