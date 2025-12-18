import React, { createContext, useContext, useState, useEffect } from 'react';

// Context used to share authentication state across the app.  The token and user
// are persisted in localStorage so that the user remains logged in on refresh.
// Note: storing JWTs in localStorage exposes them to potential XSS attacks【925935398028660†L960-L1004】.  In a
// production application you may prefer to store the token in a secure
// HttpOnly cookie to mitigate this risk.
export const AuthContext = createContext({ token: null, user: null });

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}