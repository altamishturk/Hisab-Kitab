import { Schema, model, Document, Types } from 'mongoose';

export interface IBorrowTransaction extends Document {
  amount: number;
  from: Types.ObjectId; // Person who gave the money
  to: Types.ObjectId;   // Person who took the money
  description: string;
  borrowedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BorrowTransactionSchema = new Schema<IBorrowTransaction>(
  {
    amount: { type: Number, required: true },
    from: { type: Schema.ObjectId, ref: "person"},
    to: { type: Schema.ObjectId, ref: "person"}, 
    description: { type: String, default: ''},
    borrowedAt: { type: Date, required: true},
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);


export const BorrowTransaction = model<IBorrowTransaction>('BorrowTransaction', BorrowTransactionSchema);
