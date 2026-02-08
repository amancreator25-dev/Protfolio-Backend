import { Router } from "express";
import { changePassword, getCurrentUser, refreshAccessToken, registerUser,updateAccountDetails,userLogin, userLogout } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/register").post(
    registerUser                    //API response Sending
);

router.route("/Login").post(userLogin);

router.route("/Logout").post(
    verifyJWT,                      //middlewareInjection 
    userLogout
);

router.route("/Change-Password").post(verifyJWT,changePassword)

router.route("/Account-Details").get(verifyJWT,getCurrentUser)

router.route("/Get-RefreshToken").post(verifyJWT,refreshAccessToken)

export default router;