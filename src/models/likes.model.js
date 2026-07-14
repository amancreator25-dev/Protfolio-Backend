import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        blog: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Prevent a user from liking the same blog multiple times
likeSchema.index(
    { likedBy: 1, blog: 1 },
    { unique: true }
);

export const Like = mongoose.model("Like", likeSchema);