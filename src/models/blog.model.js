import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        // Optional cover image
        blogImage: {
            type: String, // Cloudinary URL
            default: ""
        },

        isPublished: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const Blog = mongoose.model("Blog", blogSchema);