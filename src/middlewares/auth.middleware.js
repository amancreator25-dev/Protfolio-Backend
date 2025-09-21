import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT= asyncHandler(async(req, res, next)=>{
   const token=await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

   if(!token){
    throw new apiError(401,"Error in authorization(Unauthorized)!");
   }

   const decodedToken=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

   const user=await User.findById(decodedToken?._id).select("-password -refreshToken");

   if(!user){
    throw new apiError(400,"something went wrong!!!");
   }
})