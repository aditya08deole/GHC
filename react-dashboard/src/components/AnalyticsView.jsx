import React from 'react';

const AnalyticsView = ({ onClose }) => {
  return (
    <div className="analytics-view">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <button className="btn-close" onClick={onClose}>× Close</button>
      </div>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Water Consumption</h3>
          <div className="chart-placeholder">
            <p>Daily Average: 850L</p>
            <p>Weekly Total: 5,950L</p>
            <p>Monthly Total: 25,500L</p>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Motor Runtime</h3>
          <div className="chart-placeholder">
            <p>Today: 3.2 hours</p>
            <p>This Week: 22.5 hours</p>
            <p>Efficiency: 92%</p>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Temperature Trends</h3>
          <div className="chart-placeholder">
            <p>Current: 26.5°C</p>
            <p>Average: 25.8°C</p>
            <p>Range: 22°C - 29°C</p>
          </div>
        </div>

        <div className="analytics-card">
          <h3>System Health</h3>
          <div className="chart-placeholder">
            <p>Status: ✓ Operational</p>
            <p>Uptime: 99.8%</p>
            <p>Last Maintenance: 5 days ago</p>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Alerts & Notifications</h3>
          <div className="chart-placeholder">
            <p>⚠ Low water level detected (2 days ago)</p>
            <p>✓ System restart successful</p>
            <p>ℹ Scheduled maintenance in 10 days</p>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Energy Usage</h3>
          <div className="chart-placeholder">
            <p>Today: 4.2 kWh</p>
            <p>This Month: 125 kWh</p>
            <p>Cost: ₹875</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
