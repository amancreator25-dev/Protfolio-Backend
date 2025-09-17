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
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema)