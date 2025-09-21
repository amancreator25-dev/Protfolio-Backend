import {User} from "../models/user.model"

const generateAccessTokenAndRefreshToken=async (userId)=>{
    try{
        const user=await User.findById(userId);
        const accessToken=await user.generateAccessToken();                 //Check this line while debugging
        const refreshToken=await user.generateRefreshToken();               //Check this line while debugging

            user.refreshToken=refreshToken;                                 //Check this line while debugging
            await user.save({validateBeforeSave:false})

        return {accessToken, refreshToken};
    }catch(error){
        throw new apiError(500,"Something went wrong while generating access and refresh token!!")
    }
}

export default generateAccessTokenAndRefreshToken;