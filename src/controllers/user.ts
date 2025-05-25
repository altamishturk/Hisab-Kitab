import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { validationResult } from "express-validator"
import { sendToken } from "../utils/sendToken";
import bcrypt from "bcrypt";



export const getLoggedInUser = async (req:Request,res:Response,next:NextFunction)=>{
        
        try {
            res.status(200).json({
                success: true,
                message: 'user fount',
                user: (req as any).user
            })

        } catch (error) {
            
        res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }
}


