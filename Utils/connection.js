import mongoose from "mongoose";

const connection = async () =>{
    try {
       await mongoose.connect(process.env.MONGODB_URI) 
       console.log("DB connected ◡̈ ")
       return true
    } catch (error) {
        console.log("DB failed to connect -_-");
    return false
    }
}
export default connection