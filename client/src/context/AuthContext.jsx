import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('authToken')));
  const [loading, setLoading] = useState(false);

  const persistAuth = useCallback((data) => {
    const nextUser = data?.user || data?.data || null;
    setUser(nextUser);
    setIsAuthenticated(Boolean(data?.token));

    if (data?.token) {
      localStorage.setItem('authToken', data.token);
    }

    if (nextUser) {
      localStorage.setItem('user', JSON.stringify(nextUser));
    }

    return nextUser;
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      persistAuth(data);
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      persistAuth(data);
      return data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
