import { Request, Response } from "express";
import {Crop} from "../models/crop";


// (async () => {
//   const s = await Crop.find().populate("user");
//   console.log(s);
// })()

export const createCrop = async (req: Request, res: Response) => {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).json({crop});
  } catch (error) {
    res.status(500).json({ message: "Error creating crop record", error });
  }
};


export const getAllCrops = async (req: Request, res: Response) => {
  try {
    // console.log((req as any));
    
    const crops = await Crop.find();
    res.status(200).json({crops});
  } catch (error) {
    res.status(500).json({ message: "Error fetching crops", error });
  }
};


export const getCropById = async (req: Request, res: Response) => {
  try {
    const crop = await Crop.findById(req.params.cropId);

    if (!crop) {
      throw new Error("Crop not found");
    }
    
    res.status(200).json({crop});
  } 
  catch (error) {
    res.status(500).json({ message: "Error fetching crop", error });
  }
};


export const updateCrop = async (req: Request, res: Response) => {
  try {
    const updatedCrop = await Crop.findByIdAndUpdate(
      req.params.cropId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCrop) {
      throw new Error("Crop not found");
    }
    res.status(200).json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: "Error updating crop", error });
  }
};


export const addYourExpense = async (req: Request, res: Response) => {
  try {
      
      const crop = await Crop.findByIdAndUpdate(req.params.cropId,{
        $push: {yourExpenses: req.body}
      },{ new: true, runValidators: true });

      if (!crop) {
        throw new Error("Crop not found");
      }

      res.status(200).json({crop});

  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating crop", error });
  }
};


export const addSale = async (req: Request, res: Response) => {
  try {
      
      const crop = await Crop.findByIdAndUpdate(req.params.cropId,{
        $push: {sales: {...req.body}}
      },{ new: true, runValidators: true });

      if (!crop) {
        throw new Error("Crop not found");
      }

      res.status(200).json({crop});

  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating crop", error });
  }
};


export const deleteCrop = async (req: Request, res: Response) => {
  try {
    const deletedCrop = await Crop.findByIdAndDelete(req.params.cropId);
    if (!deletedCrop) {
      throw new Error("Crop not found");
    }
    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting crop", error });
  }
};
