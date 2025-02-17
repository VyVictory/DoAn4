import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import '../styles/tailwind.css';
import AdminPage from '../pages/AdminPage';
import UserPage from '../pages/UserPage';
import Messages from '../pages/Messages.jsx';
import Layout from './Layout.jsx';
import Login from '../pages/Login.jsx';
import { useAuth } from '../components/AuthProvider.jsx';
const AppRouter = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<UserPage />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/login" element={<Login />} />
      {/* Các route khác */}
    </Route>
    <Route path="/admin" element={<AdminPage />} />
  </Routes>
);

const App = () => {
  const { showLogin, setShowLogin } = useAuth();
  return (
    <Router>
      {showLogin && <Login />}
      <AppRouter />
    </Router>
  );
}

export default App;
