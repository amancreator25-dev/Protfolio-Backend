import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { Blog } from "../models/blog.model.js"
import { User } from "../models/user.model.js"

const createBlog=asyncHandler(async(req, res)=>{
    const {content, title}=req.body

    if(
        [title, content].some((field)=>field?.trim()==="")
        ){
        throw new apiError(400, "Give an Title and Content to the Blog!!!")
        }
    
    const uploadBlog=await Blog.create({
        title:title,
        content:content,
    })

    if(!uploadBlog){
        throw new apiError(404,"Error in uploading Blog!")
    }

    res
    .status(200)
    .json(new apiResponse(200,uploadBlog,"Blog Uploaded Successfully!!!"))
})

export {
    createBlog,
}
