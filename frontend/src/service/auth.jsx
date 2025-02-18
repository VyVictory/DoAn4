import axios from 'axios';

// Tạo một instance của Axios với base URL
const api = axios.create({
    baseURL: 'https://doan4-5by5.onrender.com/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hàm lưu token vào localStorage
const saveToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Hàm lấy token từ localStorage
const getToken = () => {
    return localStorage.getItem('authToken');
};

// Thêm interceptor để tự động gắn token vào header
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * Đăng ký tài khoản.
 * @param {Object} userData - Dữ liệu đăng ký.
 * @param {string} userData.name - Tên đầy đủ.
 * @param {string} userData.email - Email.
 * @param {string} userData.password - Mật khẩu.
 * @param {Date} userData.birthDate - Ngày sinh.
 * @param {string} userData.gender - Giới tính.
 * @returns {Promise<Object>} Dữ liệu phản hồi từ API.
 */
export const register = async (userData) => {
    try {
        const response = await api.post('/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            birthDate: userData.birthDate,
            gender: userData.gender
        }
        );
        return response.data;
    } catch (error) {
        console.error('Register Error: ', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

/**
 * Đăng nhập tài khoản.
 * @param {Object} credentials - Thông tin đăng nhập.
 * @param {string} credentials.email - Email.
 * @param {string} credentials.password - Mật khẩu.
 * @returns {Promise<Object>} Dữ liệu phản hồi từ API (bao gồm token).
 */
export const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        const { token, user } = response.data;

        // Lưu token vào localStorage
        saveToken(token);

        return { token, user };
    } catch (error) {
        console.error('Login Error: ', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

/**
 * Đăng xuất tài khoản (xóa token).
 */
export const logout = () => {
    localStorage.removeItem('authToken');
};

export default api;
