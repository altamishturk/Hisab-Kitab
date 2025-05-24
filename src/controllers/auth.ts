import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { validationResult } from "express-validator"
import { sendToken } from "../utils/sendToken";
import bcrypt from "bcrypt";


export const signup = async (req:Request,res:Response,next:NextFunction)=>{

      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            message: errors.array()[0].msg 
        });
    }
    
    const userExists = await User.findOne({email: req.body.email})

    if (userExists) {
        return next(res.status(404).json({
            success: false,
            message: 'user is already exists with this email'
        }))
    }

    let user = new User(req.body);

    if (!user) {
        return next(res.status(404).json({
            success: false,
            message: 'could not create account'
        }))
    }

    // save hashed password 
    await (user as any).hashIt(req.body.password);
    
    await user.save();

    // send token to the user in response 
    sendToken(req,res,next,user);

    } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "Server Error!"
            })
        }

}


export const login = async (req:Request,res:Response,next:NextFunction)=>{

      try {
            const user = await User.findOne({email: req.body.email});

            if (!user) {
                return next(res.status(404).json({
                    success: false,
                    message: 'Email or Password Does not match'
                }))
            }


            const isAuthenticate =  await bcrypt.compare(req.body.password, (user as any).passwordhash);


            if (!isAuthenticate) {
                return next(res.status(404).json({
                    success: false,
                    message: 'Email or Password Does not match'
                }))
            }

            // send token to the user in response 
            sendToken(req,res,next,user)

    } 
    catch (error) {
            
        res.status(400).json({
            success: false,
            message: "Server Error!"
        })
    }
}


export const logout =  async (req:Request,res:Response,next:NextFunction)=>{

      try {
        //clear the cookie
        res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        });

        //send JSON response for success
        res.status(200).json({
        succes: true,
        message: "Logout success",
        });

        } 
      catch (error) {
                    
                    return res.status(400).json({
                        success: false,
                        message: "Server Error!"
                    })
                }
}