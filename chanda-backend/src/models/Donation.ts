import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IDonation extends Document {
  name: string;
  profession: string;
  district: string;
  amount: number;
  date: Date;
  user?: Types.ObjectId;
}

const DonationSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Oi, mister! What\'s your name? Too shy to tell?'],
  },
  profession: {
    type: String,
    required: [true, 'Even jobless people have a title. What\'s yours?'],
    enum: [
      'Doctor',
      'Engineer',
      'Teacher',
      'Student',
      'Businessman',
      'Unemployed',
      'Others',
    ],
  },
  district: {
    type: String,
    required: [true, 'Represent your district! Or are you from Wakanda?'],
  },
  amount: {
    type: Number,
    required: [true, 'Don\'t be cheap. How much are you giving?'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
});

export default mongoose.model<IDonation>('Donation', DonationSchema);
