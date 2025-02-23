import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../AuthProvider";
import { login } from "../../service/auth";

export default function Login({ chaneform }) {
  const { setShowLogin ,} = useAuth();
  const [formData, setFormData] = useState({
    identifier: "1@a.com",
    password: "adad",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier);
    const isPhoneNumber = /^[0-9]{10,15}$/.test(formData.identifier);

    if (!formData.identifier) {
      validationErrors.identifier = "Vui lòng nhập email hoặc số điện thoại.";
    } else if (!isEmail && !isPhoneNumber) {
      validationErrors.identifier =
        "Không hợp lệ. Vui lòng nhập email hoặc số điện thoại.";
    }

    if (!formData.password)
      validationErrors.password = "Vui lòng nhập mật khẩu.";
    return validationErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier);
        const requestData = isEmail
          ? { email: formData.identifier, password: formData.password }
          : { numberPhone: formData.identifier, password: formData.password };

        // Call the login function from service.js
        const { token, user } = await login(requestData);
        console.log(user)
        toast.success(`Chào mừng bạn, ${user?.firstName+ user?.lastName}.`, {
          autoClose: 500,
        });
        setTimeout(() => {
          window.location.reload(); // 🟢 Reload lại trang sau 500ms để đảm bảo UI cập nhật
        }, 1000);
        setShowLogin(false);
      } catch (error) {
        toast.error(error.message || "Đăng nhập thất bại, vui lòng thử lại.", {
          autoClose: 500,
        });
      } finally {
        setLoading(false);
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

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-white shadow-lg shadow-gray-500 rounded-2xl w-full my-4 max-w-sm">
        <button
          onClick={() => setShowLogin(false)}
          className="w-full flex justify-end top-2 right-6 text-gray-500 hover:text-gray-700 p-2"
        >
          <XMarkIcon className="h-8 w-8 hover:bg-red-200 rounded-lg" />
        </button>
        <div className="p-10">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Đăng nhập
          </h1>

          <div className="mb-5">
            <label
              htmlFor="identifier"
              className="block text-gray-600 text-sm font-medium"
            >
              Email hoặc Số điện thoại
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập email hoặc số điện thoại"
            />
            {errors.identifier && (
              <p className="text-red-500 text-xs mt-2">{errors.identifier}</p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium"
            >
              Mật khẩu
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
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <Link
            to="/forgotpass"
            className="float-right text-sm text-blue-500 hover:underline mb-2"
          >
            Quên mật khẩu?
          </Link>

          <button
            onClick={() => handleSubmit()}
            type="submit"
            className="w-full py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>

          <div className="flex items-center justify-between mt-3 mb-4 text-nowrap">
            <div className="text-sm text-gray-400 hover:underline">
              Chưa có tài khoản?
            </div>
            <button
              onClick={() => chaneform("register")}
              className="text-sm text-blue-500 hover:underline"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
