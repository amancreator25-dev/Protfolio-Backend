import mongoose,{Schema} from "mongoose"

const contactSchema=new Schema({
    fullname:{
        type:String,
        required:true
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
    description:{
        type:String
    }
})

export const Contact=mongoose.model("Contact",contactSchema)