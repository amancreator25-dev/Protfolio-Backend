import mongoose,{Schema} from "mongoose"

const blogSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true
    },
    blogimage:{
        type:String,     //cloudinary Url
    }
},{timestamps:true})

export const Blog=mongoose.model("Blog",blogSchema)