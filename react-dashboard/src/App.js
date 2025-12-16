import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Visualizer from './components/Visualizer';
import AnalyticsView from './components/AnalyticsView';
import useThingSpeak from './hooks/useThingSpeak';

function App() {
  // State management
  const [waterLevel, setWaterLevel] = useState(0);
  const [temperature, setTemperature] = useState(26.5);
  const [motorRunning, setMotorRunning] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [maxLevel] = useState(100);
  const [fillRate] = useState(0.6); // % per second

  // ThingSpeak integration (uncomment and configure when ready)
  // const CHANNEL_ID = 'YOUR_CHANNEL_ID';
  // const API_KEY = 'YOUR_READ_API_KEY';
  // const { data, loading, error } = useThingSpeak(CHANNEL_ID, API_KEY, 5000);

  // Simulation mode - Remove this when using real ThingSpeak data
  useEffect(() => {
    let interval;
    
    if (motorRunning && waterLevel < maxLevel) {
      interval = setInterval(() => {
        setWaterLevel(prev => {
          const newLevel = prev + (fillRate / 10); // Update every 100ms
          return newLevel >= maxLevel ? maxLevel : newLevel;
        });
        
        // Simulate temperature variation
        setTemperature(prev => prev + (Math.random() - 0.5) * 0.1);
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [motorRunning, waterLevel, maxLevel, fillRate]);

  // Stop motor when tank is full
  useEffect(() => {
    if (waterLevel >= maxLevel && motorRunning) {
      setMotorRunning(false);
    }
  }, [waterLevel, maxLevel, motorRunning]);

  // Use ThingSpeak data when available (uncomment when ready)
  /*
  useEffect(() => {
    if (data) {
      setWaterLevel(data.waterLevel);
      setTemperature(data.temperature);
      setMotorRunning(data.motorStatus === 1);
    }
  }, [data]);
  */

  const handleToggleMotor = () => {
    if (waterLevel < maxLevel) {
      setMotorRunning(prev => !prev);
    }
  };

  const handleShowAnalytics = () => {
    setShowAnalytics(true);
  };

  const handleCloseAnalytics = () => {
    setShowAnalytics(false);
  };

  return (
    <div className="App">
      {!showAnalytics ? (
        <>
          <Header
            waterLevel={waterLevel}
            temperature={temperature}
            motorRunning={motorRunning}
            onToggleMotor={handleToggleMotor}
            onShowAnalytics={handleShowAnalytics}
          />
          <Visualizer
            waterLevel={waterLevel}
            motorRunning={motorRunning}
          />
        </>
      ) : (
        <AnalyticsView onClose={handleCloseAnalytics} />
      )}
    </div>
  );
}

export default App;
