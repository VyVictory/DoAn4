import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthProvider";
import { register } from "../../service/auth";

export default function Register({ chaneform }) {
  const { setShowLogin } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.firstName) validationErrors.firstName = "Vui lòng nhập họ.";
    if (!formData.lastName) validationErrors.lastName = "Vui lòng nhập tên.";
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
        const response = await register(formData);
        if (response) {
          toast.success("Đăng ký thành công!");
          setTimeout(() => setShowLogin(false), 1000);
        }
      } catch (error) {
        toast.error("Đăng ký thất bại, vui lòng thử lại.");
      }
    } else {
      setErrors(validationErrors);
    }
  };
  const primaryStar = () => {
    return <div className="text-red-500 mr-1">*</div>;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="flex justify-center items-center h-screen w-full  ">
      <div className="bg-white backdrop-blur-md shadow-2xl  rounded-2xl w-full max-w-lg p-6 md:py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl w-full text-center font-bold text-gray-800">
            Đăng ký
          </h1>
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-0 right-0 p-2 rounded-full"
          >
            <XMarkIcon className="h-8 w-8 hover:bg-red-200 rounded-lg" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <InputField
            label="Email"
            name="email"
            onHoder="Nhập email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Họ"
              name="firstName"
              onHoder="Nhập họ"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <InputField
              label="Tên"
              name="lastName"
              onHoder="Nhập tên"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Mật khẩu"
              name="password"
              type="password"
              onHoder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <InputField
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              type="password"
              onHoder="Nhập mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Ngày sinh"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              error={errors.birthDate}
            />
            <div>
              <label className="flex flex-row text-black text-sm font-medium ">
                {primaryStar()}Giới tính
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 min-h-[46.3px] rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none bg-gray-50 shadow-inner shadow-gray-300"
              >
                <option value="">Chọn</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Đăng ký
          </button>

          <div className="text-center text-sm mt-4 text-gray-600">
            <span>Đã có tài khoản?</span>{" "}
            <button
              onClick={() => chaneform("login")}
              className="text-blue-600 hover:underline font-semibold"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  onHoder,
}) => (
  <div>
    <label className="flex flex-row text-black text-sm font-medium">
      <div className="text-red-500 mr-1">*</div>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={onHoder}
      className={`mt-2 block w-full px-4 py-3  rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-inner shadow-gray-300 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p className="text-red-500 text-xs" style={{ marginBottom: "-10px" }}>
        {error}
      </p>
    )}
  </div>
);
