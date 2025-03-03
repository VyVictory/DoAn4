import api from "./api";

/**
 * Lấy thông tin hồ sơ người dùng.
 * @returns {Promise<Object>} Dữ liệu người dùng từ API.
 */
export const getProfile = async () => {
    try {
        const response = await api.get('user/profile');
        // console.log(response)
        return response.data;
    } catch (error) {
        console.error('Get Profile Error:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};
export const getCurrentUser = async (id) => {
    try {
        const response = await api.get('user/profile/' + id);
        // console.log(response)
        return response.data;
    } catch (error) {
        console.error('Get Profile Error:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export default {getProfile, getCurrentUser};
