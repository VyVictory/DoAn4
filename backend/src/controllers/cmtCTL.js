import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Comment from '../models/comment.js';

const router = express.Router();

// Lấy bình luận
export const getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment', error });
    }
};

// Lấy tất cả bình luận
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

// Xóa bình luận
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await comment.delete();
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};
// Đăng bình luận
export const createComment = async (req, res) => {
    const { content } = req.body;

    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const newComment = new Comment({
            author: req.user.id,
            post: comment.post,
            content
        });

        await newComment.save();
        comment.comments.push(newComment._id);
        await comment.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
}