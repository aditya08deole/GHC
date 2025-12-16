import React, { useRef, useEffect } from 'react';

const Visualizer = ({ waterLevel, motorRunning }) => {
  const dropletsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const dropletsArrayRef = useRef([]);
  const lastSpawnRef = useRef(0);

  // Droplet animation logic
  useEffect(() => {
    if (!motorRunning) {
      // Clear droplets when motor stops
      dropletsArrayRef.current = [];
      if (dropletsRef.current) {
        dropletsRef.current.innerHTML = '';
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = (time) => {
      if (!dropletsRef.current) return;

      // Spawn new droplets at intervals
      if (time - lastSpawnRef.current > 150) {
        const droplet = {
          id: Date.now() + Math.random(),
          x: 420,
          y: 420,
          vy: 0,
          age: 0
        };
        dropletsArrayRef.current.push(droplet);
        lastSpawnRef.current = time;
      }

      // Update and render droplets
      const waterSurfaceY = 280 - (waterLevel * 2); // Tank top is at y=80, height=200
      
      dropletsArrayRef.current = dropletsArrayRef.current.filter(droplet => {
        droplet.vy += 0.5; // Gravity
        droplet.y += droplet.vy;
        droplet.age += 1;

        // Remove if hit water surface or too old
        if (droplet.y >= waterSurfaceY || droplet.age > 200) {
          return false;
        }
        return true;
      });

      // Render all droplets
      dropletsRef.current.innerHTML = dropletsArrayRef.current
        .map(d => `<circle cx="${d.x}" cy="${d.y}" r="3" fill="#4FC3F7" opacity="0.7"/>`)
        .join('');

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [motorRunning, waterLevel]);

  // Calculate water fill height
  const waterHeight = (waterLevel / 100) * 200; // Max height 200
  const waterY = 200 - waterHeight; // Start from bottom

  return (
    <div className="visualizer">
      <svg viewBox="0 0 600 600" className="scene">
        {/* Background Building */}
        <g id="building">
          <rect x="50" y="50" width="250" height="350" fill="#34495e" stroke="#2c3e50" strokeWidth="2" />
          <rect x="70" y="80" width="40" height="40" fill="#f39c12" opacity="0.8" />
          <rect x="130" y="80" width="40" height="40" fill="#f39c12" opacity="0.8" />
          <rect x="190" y="80" width="40" height="40" fill="#f39c12" opacity="0.8" />
          <rect x="70" y="150" width="40" height="40" fill="#3498db" opacity="0.6" />
          <rect x="130" y="150" width="40" height="40" fill="#3498db" opacity="0.6" />
          <rect x="190" y="150" width="40" height="40" fill="#3498db" opacity="0.6" />
        </g>

        {/* Water Tank */}
        <g id="tank" transform="translate(100, 80)">
          <rect x="0" y="0" width="140" height="200" fill="#ecf0f1" stroke="#2c3e50" strokeWidth="3" rx="5" />
          
          {/* Water Fill */}
          <g clipPath="url(#tankClip)">
            <rect 
              id="water-fill" 
              x="0" 
              y={waterY} 
              width="140" 
              height={waterHeight} 
              fill="#3498db" 
              opacity="0.7"
            />
            
            {/* Wave 1 */}
            <g className="wave-wrapper">
              <path
                className="wave wave1"
                d="M0,10 Q17.5,0 35,10 T70,10 T105,10 T140,10 V50 H0 Z"
                fill="#2980b9"
                opacity="0.3"
                transform={`translate(0, ${waterY})`}
              />
            </g>
            
            {/* Wave 2 */}
            <g className="wave-wrapper">
              <path
                className="wave wave2"
                d="M0,15 Q17.5,5 35,15 T70,15 T105,15 T140,15 V50 H0 Z"
                fill="#3498db"
                opacity="0.2"
                transform={`translate(0, ${waterY})`}
              />
            </g>
          </g>
          
          <clipPath id="tankClip">
            <rect x="0" y="0" width="140" height="200" rx="5" />
          </clipPath>
        </g>

        {/* Pipes */}
        <g id="pipes">
          <path 
            id="base-pipe" 
            d="M 420 420 L 240 200" 
            stroke="#7f8c8d" 
            strokeWidth="8" 
            fill="none"
            className={motorRunning ? 'pipe-active' : ''}
          />
          {motorRunning && (
            <path 
              id="flow-line" 
              d="M 420 420 L 240 200" 
              stroke="#4FC3F7" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="10 10"
              className="flow-animation"
            />
          )}
        </g>

        {/* Motor */}
        <g id="motor" transform="translate(-32, -100) scale(0.174)">
          <image href="motor.png" x="2000" y="2400" width="1000" height="1000" />
        </g>

        {/* Droplets */}
        <g id="droplets" ref={dropletsRef}></g>
      </svg>
    </div>
  );
};

export default Visualizer;
