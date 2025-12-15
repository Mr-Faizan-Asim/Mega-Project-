import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';
import Home from './components/Home.jsx';
import { useAuth } from './state/AuthContext.jsx';

/**
 * ProtectedRoute component prevents access to routes that require
 * authentication.  If the user is not logged in, they are redirected to
 * the login page.  Otherwise the wrapped component is rendered.
 */
function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const { token, logout } = useAuth();
  return (
    <div>

      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route
            path="/"
            element={
                <Chat />
            }
          />
        </Routes>
      </div>
    </div>
  );
}