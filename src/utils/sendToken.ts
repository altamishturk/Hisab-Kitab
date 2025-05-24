import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const sendToken = async (req:Request,res:Response,next:NextFunction,user:any)=>{
    
    const token = jwt.sign({user}, (process as any).env.JWT_SECRET);

    const options = {
        expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * (process as any).env.JWT_EXPITY),
        httpOnly: true,
    };

    user.password = undefined;

    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });

}