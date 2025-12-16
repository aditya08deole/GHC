# EvaraTech IoT Water Management Dashboard

A modern React-based dashboard for monitoring and controlling IoT water management systems with real-time visualization and ThingSpeak integration.

## Features

- 🎨 Modern, responsive UI with gradient design
- 💧 Real-time water level visualization with animated waves
- 🔄 Smooth droplet animations using requestAnimationFrame
- 📊 Analytics dashboard with system metrics
- 🌐 ThingSpeak API integration for ESP32 sensors
- ⚡ Optimized performance with React hooks (useState, useEffect, useRef)
- 📱 Mobile-friendly responsive design

## Project Structure

```
react-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navigation with HUD
│   │   ├── Visualizer.jsx      # SVG tank visualization
│   │   └── AnalyticsView.jsx   # Analytics dashboard
│   ├── hooks/
│   │   └── useThingSpeak.js    # Custom hook for ThingSpeak API
│   ├── App.js                  # Main application component
│   ├── App.css                 # Application styles
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd react-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## ThingSpeak Integration

To connect your ESP32 sensors via ThingSpeak:

1. Open `src/App.js`
2. Uncomment the ThingSpeak configuration:
```javascript
const CHANNEL_ID = 'YOUR_CHANNEL_ID';
const API_KEY = 'YOUR_READ_API_KEY';
const { data, loading, error } = useThingSpeak(CHANNEL_ID, API_KEY, 5000);
```

3. Uncomment the useEffect hook that processes ThingSpeak data:
```javascript
useEffect(() => {
  if (data) {
    setWaterLevel(data.waterLevel);
    setTemperature(data.temperature);
    setMotorRunning(data.motorStatus === 1);
  }
}, [data]);
```

4. Remove or comment out the simulation mode useEffect

### ThingSpeak Field Mapping

Configure your ThingSpeak channel fields:
- **Field 1**: Water Level (0-100%)
- **Field 2**: Temperature (°C)
- **Field 3**: Motor Status (0=OFF, 1=ON)
- **Field 4**: Pressure (optional)

You can customize field mappings in `src/hooks/useThingSpeak.js`

## Component Architecture

### Header
Displays logo, HUD pills (water level, temperature, motor status), and control buttons.

### Visualizer
SVG-based visualization with:
- Animated water tank with realistic waves
- Motor image with flow visualization
- Droplet animation using useRef for performance
- Pipe flow indicators

### AnalyticsView
Dashboard showing:
- Water consumption metrics
- Motor runtime statistics
- Temperature trends
- System health status
- Energy usage data

## Performance Optimizations

- **useRef for animations**: Droplet rendering uses refs to avoid unnecessary re-renders
- **requestAnimationFrame**: Smooth 60fps animations
- **Conditional rendering**: Analytics view only renders when needed
- **Memoization**: Consider adding React.memo for static components

## Customization

### Adding More Tanks

The component architecture makes it easy to display multiple tanks:

```javascript
<Visualizer tankId={1} waterLevel={tank1Level} motorRunning={motor1Running} />
<Visualizer tankId={2} waterLevel={tank2Level} motorRunning={motor2Running} />
<Visualizer tankId={3} waterLevel={tank3Level} motorRunning={motor3Running} />
```

### Styling

All styles are in `src/App.css`. The color scheme uses:
- Primary: #667eea (purple-blue)
- Secondary: #764ba2 (purple)
- Success: #10b981 (green)
- Danger: #ef4444 (red)

## Technologies Used

- **React 18**: Modern React with hooks
- **CSS3**: Gradients, animations, flexbox, grid
- **SVG**: Scalable vector graphics for visualizations
- **ThingSpeak API**: IoT data integration
- **requestAnimationFrame**: High-performance animations

## Future Enhancements

- [ ] Chart.js integration for historical data
- [ ] Real-time alerts and notifications
- [ ] Multi-tank management interface
- [ ] User authentication and role-based access
- [ ] Mobile app using React Native
- [ ] WebSocket support for live updates
- [ ] Three.js 3D motor visualization

## Support

For issues or questions, contact EvaraTech support.

## License

Proprietary - EvaraTech © 2024

---

Built with ❤️ by EvaraTech - IoT Water Management Solutions
