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
      <nav style={{ background: '#333', color: '#fff', padding: '1rem' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Mega Planner</Link>
        {token ? (
          <>
            <Link to="/chat" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Chat</Link>
            <button onClick={logout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Sign Up</Link>
            <Link to="/login" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Login</Link>
          </>
        )}
      </nav>
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}