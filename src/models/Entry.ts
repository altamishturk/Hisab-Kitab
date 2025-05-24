// src/models/LifeEntry.ts

import { Schema, model, Document } from 'mongoose';

export interface IEntry extends Document {
  type: 'expense' | 'goal' | 'habit' | 'emotion' | 'note' | 'task' | 'other';
  title: string;
  description?: string;
  date: Date;
  amount?: number; // For expenses or monetary tracking
  tags?: string[];
  metadata?: Record<string, any>; // For storing additional dynamic data
}


const EntrySchema = new Schema<IEntry>({
  
    type: {
      type: String,
      enum: ['expense', 'goal', 'habit', 'emotion', 'note', 'task', 'other'],
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    date: { type: Date, default: Date.now },
    amount: Number,
    tags: [String],
    metadata: { type: Schema.Types.Mixed }, // dynamic data (e.g. { mood: "happy" } or { priority: "high" })

  },{ timestamps: true });


export const Entry = model<IEntry>('Entry', EntrySchema);
