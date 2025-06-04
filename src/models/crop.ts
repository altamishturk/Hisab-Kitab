import mongoose, { Schema, Document } from "mongoose";

interface Expense {
  amount: number;
  description: string;
  note: string;
  paymentMode: "online" | "offline";
  date: Date;
}

interface SharedExpense extends Expense{
  initialPayer: "you" | "partner"
}

interface TakenMoney {
  amount: number;
  date: Date;
  description: string;
  note: string;
  paymentMode: "online" | "offline";
}

interface Sale {
  amount: number;
  soldTo: string;
  soldBy: string;
  description: string;
  note: string;
  paymentMode: "online" | "offline";
  date: Date;
  cashHolder: "you" | "partner"
}


type PartnershipType = 'solo' | 'partnered';

export interface ICrop extends Document {
  title: string;
  description: string;
  partnerName: string;
  yourName: string;
  cropName: string;
  startDate: Date;
  endDate: Date;
  partnerExpenses: Expense[];
  yourExpenses: Expense[];
  sharedExpenses: SharedExpense[];
  yourTakenMoney: TakenMoney[];
  partnerTakenMoney: TakenMoney[];
  sales: Sale[];
  partnershipType: PartnershipType;
  user: any;
}

const ExpenseSchema = new Schema<Expense>({
  amount: { type: Number, required: true },
  description: { type: String, default: "" },
  note: { type: String, default: "" },
  paymentMode: { type: String, enum: ["online", "offline"], required: true,default: "offline" },
  date: { type: Date, required: true },
});

const SharedExpenseSchema = new Schema<SharedExpense>({
  amount: { type: Number, required: true },
  description: { type: String, default: "" },
  note: { type: String, default: "" },
  paymentMode: { type: String, enum: ["online", "offline"], required: true,default: "offline" },
  date: { type: Date, required: true },
  initialPayer: { type: String, enum: ["you","partner"], required: true}
});

const TakenMoneySchema = new Schema<TakenMoney>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String},
  note: { type: String, default: "" },
  paymentMode: { type: String, enum: ["online", "offline"], required: true,default: "offline" },
});

const SaleSchema = new Schema<Sale>({
  amount: { type: Number, required: true },
  soldTo: { type: String, required: true },
  soldBy: { type: String, required: true },
  description: { type: String, required: true },
  note: { type: String, default: ""},
  paymentMode: { type: String, enum: ["online", "offline"], required: true, default: "offline"},
  date: { type: Date, required: true },
  cashHolder: { type: String, enum: ["you","partner"], required: true}
});


const CropSchema = new Schema<ICrop>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  partnerName: { type: String},
  yourName: { type: String, required: true },
  cropName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  partnershipType: {
    type: String,
    enum: ["solo", "partnered"],
    required: true
  },
  partnerExpenses: { type: [ExpenseSchema], default: [] },
  yourExpenses: { type: [ExpenseSchema], default: [] },
  sharedExpenses: { type: [SharedExpenseSchema], default: [] },
  yourTakenMoney: { type: [TakenMoneySchema], default: [] },
  partnerTakenMoney: { type: [TakenMoneySchema], default: [] },
  sales: { type: [SaleSchema], default: [] },
  user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
  }
});


export const Crop = mongoose.model<ICrop>("crop",CropSchema);
