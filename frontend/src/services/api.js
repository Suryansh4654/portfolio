const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  get: async (endpoint) => {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },
  post: async (endpoint, data) => {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }
};
