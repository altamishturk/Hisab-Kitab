import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary"
import { Time } from "../models/time";


export const getUnpaidTimes = async (req:Request,res:Response,next:NextFunction)=>{


        try {
            const times = await Time.find({isPaid: false});


            res.status(200).json({
                success: true,
                message: "successfully fatched all Unpaid times",
                times
            })

        } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }

}


export const getpPaidTimes = async (req:Request,res:Response,next:NextFunction)=>{

    try {
        const times = await Time.find({isPaid: true});


        res.status(200).json({
            success: true,
            message: "successfully fatched all paid times",
            times
        })

        } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }


}


export const getTimes = async (req:Request,res:Response,next:NextFunction)=>{


    try {
        let times;

        if (req.query.startDate) {
            times = await Time.find().where('startTime').gte((req as any).query.startDate).lte((req as any).query.endDate);
        }
        else{
            times = await Time.find();
        }


        res.status(200).json({
            success: true,
            message: "successfully fatched all times",
            times
        })     


        } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }

}

export const getTimeById = async (req:Request,res:Response,next:NextFunction)=>{

    try {
        const time = await Time.findById(req.params.id);

        if(!time){
            throw new Error("time not found");
        }


        res.status(200).json({
            success: true,
            message: "successfully fatched time",
            time
        })     

        } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }

}


export const newTime  = async (req:Request,res:Response,next:NextFunction)=>{
    

    try {
        const {startTime,endTime,description,image} = req.body;

        if (!startTime || !endTime ) {
            throw new Error('start time and end times are required');
        }

        let time = undefined;
        
        if (image !== "null") {
            let data = await cloudinary.v2.uploader.upload(image,{folder: 'freelancing_times_images'});
            time = await Time.create({startTime,endTime,description,image:{ publicId: data.public_id, url: data.url }});
        }
        else {
            time = await Time.create({startTime,endTime,description})
        }
        
        

        res.status(200).json({
            success: true,
            message: 'new time added successfully',
            time
        })


        } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }

}


export const updateTime  = async (req:Request,res:Response,next:NextFunction)=>{
    

    try {
        let {isPaid} = req.body;

        // console.log(req.body);

        let time = await Time.findById(req.params.id);

        if (!time) {
            return res.status(400).json({
                success: false,
                message: 'invalid id',
                time
            })
        }

        time.isPaid = isPaid;

        await time.save();

        res.status(200).json({
            success: true,
            message: 'time updated successfully',
            time
        })


        } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }

}


export const updateDescriptionAndImageOfTime  =  async (req:Request,res:Response,next:NextFunction)=>{
   

    try {
    let time = await Time.findById(req.params.id);

    if (!time) {
        throw new Error('Invalid time Id');
    }

    if (!req.body.description) {
        throw new Error('description is required');
    }

   
    if (req.body.image[0] !== '[') {
        if(time.image){
            await cloudinary.v2.uploader.destroy(time.image.publicId as any);
        }
        let data = await cloudinary.v2.uploader.upload(req.body.image,{folder: 'freelancing_times_images'});
        time.image = { publicId: data.public_id, url: data.url };
    }


    time.description = req.body.description;

    await time.save();

    res.status(200).json({
        success: true,
        message: 'time description updated successfully',
        time
    })

    } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }

}


export const deleteTime  = async (req:Request,res:Response,next:NextFunction)=>{
 
    try {
        const time = await Time.findById(req.params.id);

        if(!time){
            throw new Error("Error");
        }

        if(!time.image){
            await cloudinary.v2.uploader.destroy((time.image as any).publicId as any);
        }

        // await time();

        res.status(200).json({
            success: true,
            message: 'time deleted successfully',
            time
        })


        } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }

    
}