import { NextFunction, Request, Response } from "express";
import { Card } from "../models/card";
import { fetchVillageNames } from "../utils/fetchVillageNames";




export const createCard =  async (req:Request,res:Response,next:NextFunction) => {

    try {

        const card = await Card.create({name: "Altamish",giftGiverInfo: {name: req.body.giverName,village: req.body.giverVillage}});

        res.status(201).json({
            success: true,
            message: "",
            card
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: ""
        })
    }

}

export const addReceivedMoney =  async (req:Request,res:Response,next:NextFunction) => {

    try {

        const card = await Card.findByIdAndUpdate(req.params.cardId,{
            $push: {giftReceived: {date: new Date(),spouseName: req.body.spouseName,amount: req.body.amount}}
        },{new: true});

        res.status(201).json({
            success: true,
            message: "",
            card
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: ""
        })
    }

}

export const addGaveMoney =  async (req:Request,res:Response,next:NextFunction) => {

    try {

        const card = await Card.findByIdAndUpdate(req.params.cardId,{
            $push: {giftsWeGave: {date: new Date(),spouseName: req.body.spouseName,amount: req.body.amount}}
        },{new: true});

        res.status(201).json({
            success: true,
            message: "",
            card
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: ""
        })
    }

}

function escapeRegex(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export const getCards =  async (req:Request,res:Response,next:NextFunction) => {

    try {

        const safeSearch = escapeRegex(req.query.searchTerm as any);

        const query: any = {};

        if (req.query.searchTerm) {
            query.$or = [
                { 'giftGiverInfo.name': { $regex: safeSearch, $options: 'i' } },
                { 'giftGiverInfo.village': { $regex: safeSearch, $options: 'i' } }
            ];
        }

        const cards = await Card.find(query);
        const villages = await fetchVillageNames();


        res.status(201).json({
            success: true,
            message: "",
            cards,
            villages
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: ""
        })
    }

}

export const getVillages =  async (req:Request,res:Response,next:NextFunction) => {

    try {
        const villages = await fetchVillageNames();

        res.status(201).json({
            success: true,
            message: "",
            villages
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: ""
        })
    }

}

