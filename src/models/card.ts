// src/models/LifeEntry.ts

import { Schema, model, Document } from 'mongoose';


interface IGiftsInfo {
    date: Date;
    spouseName: string;
    amount: number;
}

interface IGiftGiverInfo {
    name: string;
    village: string;
}

export interface ICard extends Document {
   name: string;
   giftReceived: IGiftsInfo[];
   giftsWeGave: IGiftsInfo[];
   giftGiverInfo: IGiftGiverInfo;
   user: string | any;
}


const EntrySchema = new Schema<ICard>({
    name: {
        type: String,
        default: "Robina",
    },
    giftReceived: [{
        date: {
            type: Date
        },
        spouseName: {
            type: String
        },
        amount: {
            type: Number
        }
    }],
    giftsWeGave: [{
        date: {
            type: Date
        },
        spouseName: {
            type: String
        },
        amount: {
            type: Number
        }
    }],
    giftGiverInfo: {
        name: {
            type: String
        },
        village: {
            type: String
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
  },{ timestamps: true });


export const Card = model<ICard>('Entry', EntrySchema);
