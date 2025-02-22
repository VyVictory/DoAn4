import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Post from '../models/post.js';

const router = express.Router();

// Đăng bài
export const createPost = async (req, res) => {
    const { content } = req.body;

    try {
        const newPost = new Post({
            author: req.user.id,
            content
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};
// Like bài viết
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (!post.likes.includes(req.user.id)) {
            post.likes.push(req.user.id);
            await post.save();
        }

        res.json({ message: 'Post liked' });
    } catch (error) {
        res.status(500).json({ message: 'Error liking post', error });
    }
};
// Share bài viết
export const sharePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (!post.shares.includes(req.user.id)) {
            post.shares.push(req.user.id);
            await post.save();
        }

        res.json({ message: 'Post shared' });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing post', error });
    }
};

// Thu hồi bài viết
export const recallPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.isRecalled = true;
        await post.save();

        res.json({ message: 'Post recalled' });
    } catch (error) {
        res.status(500).json({ message: 'Error recalling post', error });
    }
};

// Lấy bài viết
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

// Lấy tất cả bài viết
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Xóa bài viết
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.delete();
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};



