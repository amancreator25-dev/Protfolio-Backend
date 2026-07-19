import { User } from "../models/user.model.js";
import { apiError } from "./apiError.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();

        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });


        return { accessToken, refreshToken };
    } catch (error) {
    console.error("ACTUAL ERROR:", error);
    throw error;
}
};

export default generateAccessTokenAndRefreshToken;