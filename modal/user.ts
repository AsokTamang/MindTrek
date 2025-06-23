import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    id:{
        type:String,
        unique:true,
    }
    ,
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
  
})

export const userModal=mongoose.models.User||mongoose.model('User',userSchema);