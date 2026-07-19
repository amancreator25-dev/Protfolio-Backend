import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateAccessTokenAndRefreshToken from "../utils/generateRATokens.js";

const accountRegister = asyncHandler(async (req, res) => {
    const { fullname, username, password, email } = req.body;

    if (
        [fullname, username, password, email].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new apiError(400, "All fields are required!");
    }

    const exists = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (exists) {
        throw new apiError(400, "Username or Email already exists!");
    }

    const user = await User.create({
        fullname,
        username,
        email,
        password
    });

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return res.status(201).json(
        new apiResponse(
            201,
            createdUser,
            "Account Created Successfully!"
        )
    );
});

const accountLogin = asyncHandler(async (req, res) => {
    const { login, password } = req.body;

    if (!login) {
        throw new apiError(
            400,
            "Email or Username is required!"
        );
    }

    if (!password) {
        throw new apiError(
            400,
            "Password is required!"
        );
    }

    const existUser = await User.findOne({
        $or: [
            { email: login.toLowerCase() },
            { username: login.toLowerCase() }
        ]
    });

    if (!existUser) {
        throw new apiError(
            404,
            "User not found!"
        );
    }

    const validatePassword =
        await existUser.isPasswordCorrect(password);

    if (!validatePassword) {
        throw new apiError(
            400,
            "Incorrect Password!"
        );
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(
            existUser._id
        );

    const loggedInUser = await User.findById(
        existUser._id
    ).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: false, // localhost
        sameSite: "lax"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User Logged In Successfully!"
            )
        );
});
const updatePassword = asyncHandler(async (req, res) => {
    const {
        oldPassword,
        newPassword,
        username,
        email
    } = req.body;

    if (!(email || username)) {
        throw new apiError(
            400,
            "Username or Email is required!"
        );
    }

    if (!(oldPassword && newPassword)) {
        throw new apiError(
            400,
            "Old Password and New Password are required!"
        );
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (!user) {
        throw new apiError(
            404,
            "User not found!"
        );
    }

    const isValid =
        await user.isPasswordCorrect(oldPassword);

    if (!isValid) {
        throw new apiError(
            400,
            "Incorrect Old Password!"
        );
    }

    user.password = newPassword;

    await user.save({
        validateBeforeSave: false
    });

    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "Password Updated Successfully!"
        )
    );
});

const currentUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new apiError(
            404,
            "User data not found!"
        );
    }

    return res.status(200).json(
        new apiResponse(
            200,
            req.user,
            "User Data fetched Successfully!"
        )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    };

    return res
        .status(200)
        .clearCookie(
            "accessToken",
            options
        )
        .clearCookie(
            "refreshToken",
            options
        )
        .json(
            new apiResponse(
                200,
                {},
                "User Logged Out Successfully!"
            )
        );
});

export {
    accountRegister,
    accountLogin,
    updatePassword,
    currentUser,
    logoutUser
};