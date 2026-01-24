import { Request, Response, NextFunction } from 'express';
import Donation from '../models/Donation';
import User from '../models/User';

// @desc    Get donation stats by district
// @route   GET /api/stats/districts
// @access  Public
export const getDistrictStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: '$district',
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: { totalAmount: -1 }
      }
    ]);

    res.status(200).json({ success: true, data: stats });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch district stats. The districts are probably hiding their money.' });
  }
};

// @desc    Get donation stats by profession
// @route   GET /api/stats/professions
// @access  Public
export const getProfessionStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: '$profession',
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: { totalAmount: -1 }
      }
    ]);

    res.status(200).json({ success: true, data: stats });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch profession stats. The professions are too busy earning to report.' });
  }
};

// @desc    Get top 10 donators
// @route   GET /api/leaderboard
// @access  Public
export const getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboard = await Donation.aggregate([
      {
        $group: {
          _id: '$user',
          totalDonated: { $sum: '$amount' }
        }
      },
      {
        $sort: { totalDonated: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userData'
        }
      },
      {
        $unwind: '$userData'
      },
      {
        $project: {
          _id: 0,
          rank: 0, // we will add rank later
          username: '$userData.username',
          totalDonated: '$totalDonated'
        }
      }
    ]);

    // Add rank
    const rankedLeaderboard = leaderboard.map((item: any, index: number) => ({
      rank: index + 1,
      ...item
    }));

    res.status(200).json({ success: true, data: rankedLeaderboard });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Leaderboard is on vacation. Probably funded by your donations.' });
  }
};
