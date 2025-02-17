import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import '../styles/tailwind.css';
import AdminPage from '../pages/AdminPage';
import UserPage from '../pages/UserPage';
import Messages from '../pages/Messages.jsx';
import Layout from './Layout.jsx';


const AppRouter = () => (
  
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<UserPage />} />
      <Route path="/messages" element={<Messages />} />
      {/* Các route khác */}
    </Route>
    <Route path="/admin" element={<AdminPage />} />
  </Routes>
);

const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;
