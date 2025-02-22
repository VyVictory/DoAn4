import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'emiton'; // Sử dụng biến môi trường

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
