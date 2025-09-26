import mongoose,{Schema} from "mongoose"

const blogSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    blogimage:{
        type:String,     //Cloudinary Url
    }
},{timestamps:true})

export const Blog=mongoose.model("Blog",blogSchema)