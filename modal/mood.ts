import mongoose from "mongoose";

const moodSchema=new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'    //here the user of this mood entered is our user of the mongodb so we use the type of mongoose.schema.types.objectid

    },
    mood:{
        type:String
    }
    ,
    scale:{
        type:Number
    },
    feeling:{
        type:String
    },
    journal:{
        type:String
    }
},{
    timestamps:true
})

export const moodModal=mongoose.models.Mood||mongoose.model('Mood',moodSchema);