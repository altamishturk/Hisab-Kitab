import { Schema, model, Document } from 'mongoose';

export interface Iperson extends Document {
  name: string;
  email?: string;
  phoneNumber?: string;
}

const PersonSchema = new Schema<Iperson>(
  {
    name: { type: String, unique: true, lowercase: true, trim: true },
    email: { type: String },
    phoneNumber: { type: String },
  },
  { 
    timestamps: true
  }
);

export const Person = model<Iperson>('person', PersonSchema);
