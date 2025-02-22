import User from '../models/user.js';
import mongoose from 'mongoose';

// Get User Profile
export const getProfile = async (req, res) => {
    try {
        // Tìm user theo ID và loại bỏ password
        console.log(req.user._id)
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('❌ Error fetching profile:', error);

        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};
