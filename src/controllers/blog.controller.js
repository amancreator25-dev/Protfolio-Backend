import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { Blog } from "../models/blog.model.js"

const createBlog=asyncHandler(async(req, res)=>{
    const {content, title, userId}=req.body
})