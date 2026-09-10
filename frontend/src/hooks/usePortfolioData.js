import { useState, useEffect } from 'react';
import { fallbackData } from '../data/fallbackData';

// Global cache variables to prevent multiple network requests and avoid 429 rate throttling
let cachedPortfolioData = null;
let activeFetchPromise = null;

export function usePortfolioData() {
  const [data, setData] = useState(cachedPortfolioData || fallbackData);
  const [loading, setLoading] = useState(!cachedPortfolioData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedPortfolioData) {
      setData(cachedPortfolioData);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // De-duplicate concurrent requests from multiple mounting components
        if (!activeFetchPromise) {
          activeFetchPromise = fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/portfolio/`)
            .then(async (response) => {
              if (!response.ok) {
                throw new Error('API unavailable, using fallback data');
              }
              return await response.json();
            })
            .catch((err) => {
              // Reset promise so a future retry can trigger
              activeFetchPromise = null;
              throw err;
            });
        }

        const apiData = await activeFetchPromise;
        cachedPortfolioData = apiData;
        setData(apiData);
      } catch (err) {
        console.warn('Portfolio fetch failed, using fallback static data:', err.message);
        setData(fallbackData);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
