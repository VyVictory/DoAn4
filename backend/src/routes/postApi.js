import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createPost, getPost, getPosts, deletePost, sharePost, recallPost, likePost } from '../controllers/postCLT.js';

const routerPost = express.Router();

routerPost.post('/create', authMiddleware, createPost);
routerPost.post('/:postId/send', authMiddleware, sharePost);
routerPost.post('/:postId/recall', authMiddleware, recallPost);
routerPost.get('/:postId', authMiddleware, getPost);
routerPost.get('/all', authMiddleware, getPosts);
routerPost.post('/:postId/like', authMiddleware, likePost);
routerPost.delete('/:postId', authMiddleware, deletePost);




export default routerPost;