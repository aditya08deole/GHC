import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from ThingSpeak API
 * @param {string} channelId - Your ThingSpeak channel ID
 * @param {string} apiKey - Your ThingSpeak Read API Key
 * @param {number} pollInterval - Polling interval in milliseconds (default: 5000ms = 5 seconds)
 * @returns {Object} { data, loading, error }
 */
export const useThingSpeak = (channelId, apiKey, pollInterval = 5000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!channelId || !apiKey) {
      setError('Channel ID and API Key are required');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=1`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.feeds && result.feeds.length > 0) {
          const latestFeed = result.feeds[0];
          
          // Parse the data fields
          const parsedData = {
            waterLevel: parseFloat(latestFeed.field1) || 0,
            temperature: parseFloat(latestFeed.field2) || 0,
            motorStatus: parseInt(latestFeed.field3) || 0,
            pressure: parseFloat(latestFeed.field4) || 0,
            timestamp: latestFeed.created_at,
            // Add more fields as needed
          };
          
          setData(parsedData);
          setError(null);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('ThingSpeak fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling
    const intervalId = setInterval(fetchData, pollInterval);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [channelId, apiKey, pollInterval]);

  return { data, loading, error };
};

export default useThingSpeak;
