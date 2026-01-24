import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  username?: string;
  email: string;
  password?: string; // Optional because it's selected false in queries
  tier: 'basic' | 'premium' | 'whale';
  createdAt: Date;
  getSignedJwtToken(): string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: [false, 'Please add a username'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  tier: {
    type: String,
    enum: ['basic', 'premium', 'whale'],
    default: 'basic',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password as string);
};

export default mongoose.model<IUser>('User', UserSchema);
