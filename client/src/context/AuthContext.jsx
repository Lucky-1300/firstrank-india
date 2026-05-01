import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clearStoredAuth, decodeJwtPayload, isTokenExpired, persistAuth as persistAuthSession, readStoredToken, readStoredUser } from "../utils/auth";
import { fetchProfile, loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser());
  const [token, setToken] = useState(readStoredToken());
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(readStoredToken()));
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const logoutTimerRef = useRef(null);

  const clearSession = useCallback(() => {
    if (logoutTimerRef.current) {
      window.clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
    clearStoredAuth();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  const saveAuthSession = useCallback((data) => {
    const nextUser = data?.user || data?.data || null;
    const nextToken = data?.token || null;

    if (nextToken && isTokenExpired(nextToken)) {
      clearSession();
      return null;
    }

    setUser(nextUser);
    setToken(nextToken);
    setIsAuthenticated(Boolean(nextToken));
    persistAuthSession({ token: nextToken, user: nextUser });

    return nextUser;
  }, [clearSession]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
    saveAuthSession(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const data = await registerUser(userData);
      saveAuthSession(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [saveAuthSession]);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  useEffect(() => {
    if (!token) {
      if (logoutTimerRef.current) {
        window.clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }
      setReady(true);
      return;
    }

    if (isTokenExpired(token)) {
      clearSession();
      setReady(true);
      return;
    }

    const expiryMs = decodeJwtPayload(token)?.exp ? decodeJwtPayload(token).exp * 1000 : null;

    if (expiryMs) {
      const msUntilExpiry = Math.max(0, expiryMs - Date.now());
      logoutTimerRef.current = window.setTimeout(() => {
        clearSession();
      }, msUntilExpiry);
    }

    setReady(true);
  }, [token, clearSession]);

  useEffect(() => {
    const syncProfile = async () => {
      if (!token || isTokenExpired(token)) {
        return;
      }

      try {
        const response = await fetchProfile();
        if (response?.success && response?.data) {
          const nextUser = response.data;
          setUser(nextUser);
          persistAuthSession({ token, user: nextUser });
        }
      } catch {
        // Keep local session if profile sync fails; interceptor will clear on 401.
      }
    };

    syncProfile();
  }, [token]);

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated,
    loading,
    ready,
    login,
    register,
    logout,
  }), [user, token, isAuthenticated, loading, ready, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
