import React from 'react';

const Header = ({ 
  waterLevel, 
  temperature, 
  motorRunning, 
  onToggleMotor, 
  onShowAnalytics 
}) => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">EvaraTech</span>
        <span className="logo-subtitle">IoT Water Management</span>
      </div>
      
      <div className="hud">
        <div className="pill">
          <span className="pill-label">Water Level</span>
          <span className="pill-value">{waterLevel.toFixed(1)}%</span>
        </div>
        <div className="pill">
          <span className="pill-label">Temperature</span>
          <span className="pill-value">{temperature.toFixed(1)}°C</span>
        </div>
        <div className="pill">
          <span className="pill-label">Motor Status</span>
          <span className={`pill-value ${motorRunning ? 'status-on' : 'status-off'}`}>
            {motorRunning ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      <div className="controls">
        <button 
          className={`btn-motor ${motorRunning ? 'active' : ''}`}
          onClick={onToggleMotor}
          aria-label={motorRunning ? 'Stop motor' : 'Start motor'}
        >
          {motorRunning ? 'Stop Motor' : 'Start Motor'}
        </button>
        <button 
          className="btn-analytics"
          onClick={onShowAnalytics}
          aria-label="Show analytics"
        >
          Analytics
        </button>
      </div>
    </header>
  );
};

export default Header;
