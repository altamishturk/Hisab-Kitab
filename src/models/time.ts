import mongoose from "mongoose";


const timeSchema = new mongoose.Schema({
    startTime:{
        type: Number 
    },
    endTime: {
        type: Number
    },
    description: {
        type: String
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    image: {
        publicId:{
            type: String
        },
        url: {
            type: String
        }
    }
},{timestamps: true});


export const Time = mongoose.model('time',timeSchema)