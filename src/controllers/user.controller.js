import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import generateAccessTokenAndRefreshToken from "../utils/generateRATokens.js";


const accountResgister=asyncHandler(async(req,res)=>{
    const{fullname, username, password, email}=req.body

    if(
        [fullname, email, password, username].some((field)=>field?.trim()==="")
    ){
        throw new apiError(400, "All fields are Must")
    }
    console.log("Checking for user:", email, username);

    const exists=await User.findOne({email:email, username:username})

    if(exists){
        throw new apiError(400, "Username Or Email Exists!!!")
    }

    const user=await User.create({
        username:username,
        email:email,
        password:password,
        fullname:fullname,
    })

    if(!user){
        throw new apiError(400,"Error in creating Account!")
    }

    const createdUser=await User.findById(user._id).select("-password -refreshToken");       //This .select() will remove password and refreshToken and send the remaining dataFields
    console.log(createdUser.fullname);

    return(
        res
        .status(200)
        .json(apiResponse(200,{createdUser},"Account Created Successfully!!!"))
    )

})

const accountLogin=asyncHandler(async(res,req)=>{
    const {email, password}=req.body

    if(!(email || username)){
        throw new apiError(400,"Email or Username Required!")
    }

    const existUser=await User.findOne(
        {
           $or:[{email:email},{username:username}]
        }
    )

    const validatePassword=await existUser.isPasswordCorrect(password)

    if(!validatePassword){
        throw new apiError(400,"Incorrect Password!!!")
    }

    const {accessToken, refreshToken}=generateAccessTokenAndRefreshToken(existUser._id)
    
    const options={
        httpOnly:true,
        secure:true,
    }

    return(res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(apiResponse(200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User Logged In Successfully!!!"))
    )
})

export {
    accountResgister,
    accountLogin,
}