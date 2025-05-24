import mongoose from "mongoose";



export const connect = async ()=>{
    try {
        // console.log(process.env.URL);
        await mongoose.connect(process.env.URL as any);
        console.log('connected to the database successfully');
    } 
    catch (error) {
        console.log(error);
        console.log('could not connect to the database');
    }
}

