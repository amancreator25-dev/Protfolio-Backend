import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Blog } from "../models/blog.model.js";


const createBlog = asyncHandler(async (req, res) => {

    const { title, content, status } = req.body;

    if (
        [title, content].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new apiError(
            400,
            "Title and Content are required!"
        );
    }
    const blog = await Blog.create({
        title,
        content,
        isPublished: status === "published",
        owner: req.user._id,
    });

    const createdBlog = await Blog.findById(blog._id)
        .populate("owner", "fullname username email");

    return res.status(201).json(
        new apiResponse(
            201,
            createdBlog,
            "Blog Uploaded Successfully!"
        )
    );
});

const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find()
        .populate("owner", "fullname username")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new apiResponse(
            200,
            blogs,
            "Blogs fetched successfully!"
        )
    );
});

const getBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId)
        .populate("owner", "fullname username email");

    if (!blog) {
        throw new apiError(404, "Blog not found!");
    }

    return res.status(200).json(
        new apiResponse(
            200,
            blog,
            "Blog fetched successfully!"
        )
    );
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new apiError(404, "Blog not found!");
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You can only delete your own blogs!"
        );
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "Blog deleted successfully!"
        )
    );
});

const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new apiError(404, "Blog not found!");
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You can only edit your own blogs!"
        );
    }

    if (title) blog.title = title;
    if (content) blog.content = content;

    await blog.save();

    return res.status(200).json(
        new apiResponse(
            200,
            blog,
            "Blog updated successfully!"
        )
    );
});

export {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};