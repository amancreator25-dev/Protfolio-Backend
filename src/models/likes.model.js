import mongoose,{Schema} from "mongoose"

const likeSchema=new Schema({
    likedby:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    blog:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    }
},{timestamps:true})

export const Like=mongoose.model("Like",likeSchema)