// routes/blog.routes.js

import { Router } from "express";

import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getMyBlogs
} from "../controllers/blog.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all blogs
router.get("/", getAllBlogs);

// Get single blog by ID
router.get("/:blogId", getBlogById);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

// Create blog
router.post("/create", verifyJWT, createBlog);

// Get logged-in user's blogs
router.get("/my/blogs", verifyJWT, getMyBlogs);

// Update own blog
router.put("/:blogId", verifyJWT, updateBlog);

// Delete own blog
router.delete("/:blogId", verifyJWT, deleteBlog);

export default router;