import { Response,Request, NextFunction} from "express";
import {sendEmail as sendEmailTo} from "../utils/sendEmail";


export const sendEmail =  async (req:Request,res:Response,next:NextFunction) => {

        const data = await sendEmailTo("altamishpasha@gmail.com","Enquery",JSON.stringify(req.body));


        res.status(200).json({
            success: true,
            message: "___",
            ...data
        })

}