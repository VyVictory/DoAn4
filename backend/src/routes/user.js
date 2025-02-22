import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProfile,getUsersByUsername } from '../controllers/userCTL.js';

const routerUser = express.Router();

routerUser.get('/profile',authMiddleware, getProfile);
routerUser.get('/finduser/:name', getUsersByUsername);

export default routerUser;
