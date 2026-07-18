import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'performance', label: 'Performance', icon: '📈' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'reports', label: 'Reports', icon: '📄' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">📊</div>
        <div className="logo-text">ContentPulse</div>
      </div>

      <nav className="navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="status">
          <span className="status-indicator online"></span>
          <span className="status-text">Connected</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
