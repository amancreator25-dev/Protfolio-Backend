import mongoose,{Schema} from "mongoose"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    telephone:{
        type:Number,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
    
},{timestamps:true})

export const User=mongoose.model("User",userSchema)