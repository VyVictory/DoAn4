import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const SECRET_KEY = 'emiton'; // Nên sử dụng biến môi trường cho production

// Đăng ký
export const register = async (req, res) => {
    const { name, email, password, birthDate, gender } = req.body;

    if (!name || !email || !password || !birthDate || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            birthDate,
            gender,
        });

        await newUser.save();

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            birthDate: newUser.birthDate,
            gender: newUser.gender,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Đăng nhập
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
