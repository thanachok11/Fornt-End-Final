import mongoose, { Document, Schema } from 'mongoose';

export interface IRecord extends Document {
  amount: number;
  date: Date;
  type: 'income' | 'expense';
  note?: string;
  user: mongoose.Schema.Types.ObjectId;
}

const RecordSchema: Schema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  note: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.models.Record || mongoose.model<IRecord>('Record', RecordSchema);
