import { User } from "../models/user.model.js";
import { apiError } from "./apiError.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        console.log("1. Finding user...");
        const user = await User.findById(userId);

        console.log("2. User found:", user.username);

        const accessToken = user.generateAccessToken();
        console.log("3. Access token generated");

        const refreshToken = user.generateRefreshToken();
        console.log("4. Refresh token generated");

        user.refreshToken = refreshToken;
        console.log("5. Saving user...");

        await user.save({ validateBeforeSave: false });

        console.log("6. User saved");

        return { accessToken, refreshToken };
    } catch (error) {
    console.error("ACTUAL ERROR:", error);
    throw error;
}
};

export default generateAccessTokenAndRefreshToken;