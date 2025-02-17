import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import '../styles/tailwind.css';
import AdminPage from '../pages/AdminPage';
import UserPage from '../pages/UserPage';
import AboutPage from '../pages/AboutPage';
import Messages from '../pages/Messages.jsx';
import NavBar from '../components/NavBar.jsx';

const AppRouter = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<UserPage />} />
        <Route path="/messages" element={<Messages />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;