import User from '../models/user.js';
import mongoose from 'mongoose';

// Get User Profile
export const getProfile = async (req, res) => {
    try {
        // Kiểm tra xem ID có hợp lệ không (tránh lỗi CastError)
        if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Tìm user theo ID và loại bỏ password
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};
