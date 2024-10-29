import mongoose from "mongoose";

const connectionToDb = async() => {
    try{
        await mongoose.connect(process.env.URI);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Connection Error: ", error)
    }
}

export default connectionToDb;