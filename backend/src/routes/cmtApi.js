import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createComment, getComment, getComments, deleteComment } from '../controllers/cmtCTL.js';

const routerCmt = express.Router();

routerCmt.post('/:postId/comment', authMiddleware, createComment);
routerCmt.get('/:commentId', authMiddleware, getComment);
routerCmt.get('/all', authMiddleware, getComments);
routerCmt.delete('/:commentId', authMiddleware, deleteComment);

export default routerCmt;