import express from 'express';
import authMiddleware from '../authMiddleware/authMiddleware.js';
import { getProfile } from '../controllers/userCTL.js';

const routerUser = express.Router();

routerUser.get('/profile',authMiddleware, getProfile);

export default routerUser;
