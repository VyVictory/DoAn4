import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import NotificationCss from "../NotificationCss";
import { useAuth } from "../AuthProvider";
import { register } from "../../service/auth"; // Ensure you're importing the register function
export default function Register({ chaneform }) {
  const { showLogin, setShowLogin } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.name) validationErrors.name = "Vui lòng nhập tên của bạn.";
    if (!formData.email) {
      validationErrors.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Email không hợp lệ.";
    }

    if (!formData.password)
      validationErrors.password = "Vui lòng nhập mật khẩu.";
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Mật khẩu không khớp.";
    }

    if (!formData.birthDate)
      validationErrors.birthDate = "Vui lòng nhập ngày sinh.";
    if (!formData.gender) validationErrors.gender = "Vui lòng chọn giới tính.";

    return validationErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await register(formData); // Use the register function from auth.js

        if (response) {
          toast.success(
            "Đăng ký thành công! Bạn có thể đăng nhập ngay.",
            NotificationCss.Success
          );
        }
      } catch (error) {
        console.error("Lỗi:", error);
        toast.error(
          "Đăng ký thất bại, vui lòng thử lại.",
          NotificationCss.Fail
        );
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const primaryTitle = () => {
    return <p className="text-red-500 pr-1">*</p>;
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-transparent">
      <div className="bg-white shadow-lg shadow-gray-500 rounded-lg w-full max-w-lg my-4 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => setShowLogin(false)}
          className="w-full flex justify-end  top-2 right-6 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-8 w-8 hover:bg-red-200 rounded-lg" />
        </button>
        <div className="pb-2 px-5 md:px-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Đăng ký
          </h1>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="text-gray-600 text-sm font-medium flex"
              >
                {primaryTitle()} Tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nhập tên của bạn"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2">{errors.name}</p>
              )}
            </div>

            <div className="col-span-1">
              <label
                htmlFor="email"
                className="flex text-gray-600 text-sm font-medium"
              >
                {primaryTitle()} Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="col-span-1">
              <label
                htmlFor="password"
                className="flex text-gray-600 text-sm font-medium"
              >
                {primaryTitle()} Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-2">{errors.password}</p>
              )}
            </div>

            <div className="col-span-1">
              <label
                htmlFor="confirmPassword"
                className="flex text-gray-600 text-sm font-medium"
              >
                {primaryTitle()} Nhập lại mật khẩu
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none `}
                placeholder="Nhập mật khẩu"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* Ngày sinh */}
            <div>
              <label
                htmlFor="birthDate"
                className="flex text-gray-600 text-sm font-medium"
              >
                {primaryTitle()} Ngày sinh
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="mt-2 block w-full px-3 md:px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.birthDate && (
                <p className="text-red-500 text-xs mt-2">{errors.birthDate}</p>
              )}
            </div>

            {/* Giới tính */}
            <div>
              <label
                htmlFor="gender"
                className="flex text-gray-600 text-sm font-medium"
              >
                {primaryTitle()} Giới tính
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" style={{ color: "gray" }}>
                  Chọn
                </option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>

              {errors.gender && (
                <p className="text-red-500 text-xs mt-2">{errors.gender}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => handleSubmit()}
            type="submit"
            className="w-full py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          >
            Đăng ký
          </button>

          <div className="flex items-center justify-between mt-3 mb-4 text-nowrap">
            <span className="text-sm text-gray-400">Đã có tài khoản?</span>{" "}
            {/* Change Link to span */}
            <button
              onClick={() => chaneform("login")}
              className="text-sm text-blue-500 hover:underline"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
