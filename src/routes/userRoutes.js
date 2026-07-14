// routes/user.routes.js

import { Router } from "express";

import {
    accountRegister,
    accountLogin,
    updatePassword,
    currentUser,
    logoutUser
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", accountRegister);
router.post("/login", accountLogin);


router.post("/logout", verifyJWT, logoutUser);

router.patch(
    "/change-password",
    verifyJWT,
    updatePassword
);

router.get(
    "/me",
    verifyJWT,
    currentUser
);

export default router;