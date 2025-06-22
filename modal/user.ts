import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    id:{
        type:String
    }
    ,
    name:{
        type:String
    },
    email:{
        type:String
    },
  
})

export const userModal=mongoose.models.User||mongoose.model('User',userSchema);