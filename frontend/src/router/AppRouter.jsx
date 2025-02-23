import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Layout from "../Layout/Layout.jsx";
import Auth from "../Layout/Auth.jsx";

import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import Messages from "../pages/messager/Messages.jsx";
import { useAuth } from "../components/AuthProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../pages/profile/profile.jsx";
import Profile1 from "../components/profile/profile.jsx";
import Test from "../pages/test.jsx";
const AppRouter = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<UserPage />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile1" element={<Profile1 />} />
      {/* Các route khác */}
    </Route>
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/test" element={<Test />} />
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
};

export default App;
