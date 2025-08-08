import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Errorhandler } from "../utils/ErrorHandler";


export const isLoggedIn =  async (req:Request,res:Response,next:NextFunction) => {

    try {
                // check token first in cookies
            // let token = req.cookies.token;
            let token = undefined;

            // if token not found in cookies, check if header contains Auth field
            if (!token && req.header("Authorization")) {
                token = (req as any).header("Authorization").replace("Bearer ", "");
            }

            
            if (!token) {
                throw new Error("login to access this resource");
            }

            let jwtData:any =  '';
        
            try {
                jwtData =  jwt.verify(token,(process as any).env.JWT_SECRET);
            } catch (error) {
                throw new Error("Invalid JSON Token");
            }


            if (!jwtData) {
                throw new Error("token has been expired");
            }

            (req as any).user = jwtData.user;
            (req as any).token = token;

            next();

    } catch (error:any) {
            
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}


export const isAuthorized = (role: any) =>{
    
    return (req:Request,res:Response,next:NextFunction) => {
    
        if((req as any).user.role !== role){
            return next(res.status(401).json({
                success: false,
                message: `user wuth ${(req as any).user.role} role can't access this resource`
            }))
        }
        next();
    }
}