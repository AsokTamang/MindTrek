import mongoose from "mongoose";

export const connectionMongoose=async()=>{
try {
    if(mongoose.connection.readyState===0){
    await mongoose.connect(process.env.MONGODB_URI!);}


    
} catch (error:unknown) {
    if(error instanceof Error){
        console.log(error.message);
    }

    
};
}