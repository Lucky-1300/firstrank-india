
const API_URL = "http://localhost:3000/api";

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs || 10000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const { timeoutMs: _timeoutMs, ...fetchOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('API timeout: Request took too long');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
