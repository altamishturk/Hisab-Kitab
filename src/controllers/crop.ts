import { Request, Response } from "express";
import {Crop} from "../models/crop";



export const createCrop = async (req: Request, res: Response) => {
  try {
    const crop = await Crop.create({...req.body,user: (req as any).user._id});
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
    const crop = await Crop.findByIdAndUpdate(
      req.params.cropId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!crop) {
      throw new Error("Crop not found");
    }

    res.status(200).json({crop});

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

export const updateYourExpense = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;
    const updateData = req.body;

    const crop = await Crop.findOneAndUpdate(
      {
        _id: cropId,
        "yourExpenses._id": expenseId,
      },
      {
        $set: {
          "yourExpenses.$": { _id: expenseId, ...updateData },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};

export const addPartnerExpense = async (req: Request, res: Response) => {
  try {
      
      const crop = await Crop.findByIdAndUpdate(req.params.cropId,{
        $push: {partnerExpenses: req.body}
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

export const updatePartnerExpense = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;
    const updateData = req.body;

    const crop = await Crop.findOneAndUpdate(
      {
        _id: cropId,
        "partnerExpenses._id": expenseId,
      },
      {
        $set: {
          "partnerExpenses.$": { _id: expenseId, ...updateData },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};

export const addSharedExpenses = async (req: Request, res: Response) => {
  try {
      
      const crop = await Crop.findByIdAndUpdate(req.params.cropId,{
        $push: {sharedExpenses: req.body}
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


export const updateSharedExpenses = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;
    const updateData = req.body;

    const crop = await Crop.findOneAndUpdate(
      {
        _id: cropId,
        "sharedExpenses._id": expenseId,
      },
      {
        $set: {
          "sharedExpenses.$": { _id: expenseId, ...updateData },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};


export const addYourTakenMoney = async (req: Request, res: Response) => {
  try {
      
      const crop = await Crop.findByIdAndUpdate(req.params.cropId,{
        $push: {yourTakenMoney: req.body}
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

export const updateYourTakenMoney = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;
    const updateData = req.body;

    const crop = await Crop.findOneAndUpdate(
      {
        _id: cropId,
        "yourTakenMoney._id": expenseId,
      },
      {
        $set: {
          "yourTakenMoney.$": { _id: expenseId, ...updateData },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};

export const addPartnerTakenMoney = async (req: Request, res: Response) => {
  try {
      
      const crop = await Crop.findByIdAndUpdate(req.params.cropId,{
        $push: {partnerTakenMoney: req.body}
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

export const updatePartnerTakenMoney = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;
    const updateData = req.body;

    const crop = await Crop.findOneAndUpdate(
      {
        _id: cropId,
        "partnerTakenMoney._id": expenseId,
      },
      {
        $set: {
          "partnerTakenMoney.$": { _id: expenseId, ...updateData },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
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

export const updateSales = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;
    const updateData = req.body;

    const crop = await Crop.findOneAndUpdate(
      {
        _id: cropId,
        "sales._id": expenseId,
      },
      {
        $set: {
          "sales.$": { _id: expenseId, ...updateData },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
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

export const deleteYourExpense = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;
  

    const crop = await Crop.findOneAndUpdate(
      { _id: cropId },
      {
        $pull: {
          yourExpenses: { _id: expenseId },
        },
      },
      { new: true}
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};

export const deletePartnerExpense = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;


    const crop = await Crop.findOneAndUpdate(
      { _id: cropId },
      {
        $pull: {
          partnerExpenses: { _id: expenseId },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};

export const deleteSharedExpenses = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;


    const crop = await Crop.findOneAndUpdate(
      { _id: cropId },
      {
        $pull: {
          sharedExpenses: { _id: expenseId },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};

export const deleteYourTakenMoney = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;
   
    const crop = await Crop.findOneAndUpdate(
      { _id: cropId },
      {
        $pull: {
          yourTakenMoney: { _id: expenseId },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};

export const deletePartnerTakenMoney = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;
 

    const crop = await Crop.findOneAndUpdate(
      { _id: cropId },
      {
        $pull: {
          partnerTakenMoney: { _id: expenseId },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};

export const deleteSales = async (req: Request, res: Response) => {
  try {
    const { cropId, expenseId } = req.params;

    const crop = await Crop.findOneAndUpdate(
      { _id: cropId },
      {
        $pull: {
          sales: { _id: expenseId },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ crop });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating partner expense", error });
  }
};

