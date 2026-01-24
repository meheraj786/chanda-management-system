import { Request, Response, NextFunction } from 'express';
import Donation, { IDonation } from '../models/Donation';
import { IUser } from '../models/User';

interface CustomRequest extends Request {
  user?: IUser;
}

// @desc    Create new donation
// @route   POST /api/donations
// @access  Public
export const createDonation = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, profession, district, amount } = req.body;
  let userId = null;

  // If user is logged in, associate donation with user
  if (req.user) {
    userId = req.user._id;
  }

  try {
    const donation: IDonation = await Donation.create({
      name,
      profession,
      district,
      amount,
      user: userId,
    });

    res.status(201).json({
      success: true,
      data: donation,
      message: "Thanks for the cash! We'll probably use it for something important. Maybe."
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all donations for a user
// @route   GET /api/user/donations
// @access  Private
export const getUserDonations = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const donations: IDonation[] = await Donation.find({ user: req.user?.id }).sort({ date: -1 });

    const totalDonated = donations.reduce((acc, donation) => acc + donation.amount, 0);

    res.status(200).json({
      success: true,
      count: donations.length,
      total: totalDonated,
      data: donations,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Server error. We probably used your donation money to fix it.' });
  }
};
