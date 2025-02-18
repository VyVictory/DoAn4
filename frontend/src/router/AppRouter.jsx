import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import '../styles/tailwind.css';
import AdminPage from '../pages/AdminPage';
import UserPage from '../pages/UserPage';
import Messages from '../pages/Messages.jsx';
import Layout from './Layout.jsx';
import Login from '../pages/Login.jsx';
import { useAuth } from '../components/AuthProvider.jsx';
import Register from '../pages/Register.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './Auth.jsx';
const AppRouter = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<UserPage />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/login" element={<Login />} />
      {/* Các route khác */}
    </Route>
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

const App = () => {
  const { showLogin, setShowLogin } = useAuth();
  return (
    <Router>
      {showLogin && <Auth />}
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} limit={3} />
    </Router>
  );
}

export default App;
