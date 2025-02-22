import React, { createContext, useContext, useState, useEffect } from "react";
import getProfile from "../service/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true); // 🟢 Thêm trạng thái loading

  // Hàm gọi API để lấy thông tin người dùng
  const fetchProfile = async () => {
    setIsLoadingProfile(true); // 🟢 Bắt đầu tải profile
    try {
      const userData = await getProfile();
      console.log(userData.user.user);
      setProfile(userData.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } finally {
      setIsLoadingProfile(false); // 🟢 Đánh dấu đã load xong
    }
  };

  // Lấy thông tin người dùng ngay khi component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        showLogin,
        setShowLogin,
        profile,
        setProfile,
        isLoadingProfile,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
