const Donation = require('../models/Donation');
const User = require('../models/User');

// Create donation
exports.createDonation = async (req, res) => {
  try {
    const { name, profession, district, amount } = req.body;

    if (!name || !profession || !district || !amount) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than 0' });
    }

    const donation = new Donation({
      name,
      profession,
      district,
      amount,
      user: req.userId || null,
    });

    await donation.save();

    // Update user's total donated if logged in
    if (req.userId) {
      await User.findByIdAndUpdate(
        req.userId,
        { $inc: { totalDonated: amount } },
        { new: true }
      );
    }

    res.status(201).json({
      message: 'Donation created successfully',
      donation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('user', 'username email')
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get district-wise stats
exports.getDistrictStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: '$district',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get profession-wise stats
exports.getProfessionStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: '$profession',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leaderboard (top donators)
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Donation.aggregate([
      {
        $match: { user: { $ne: null } },
      },
      {
        $group: {
          _id: '$user',
          totalAmount: { $sum: '$amount' },
          username: { $first: '$name' },
          donationCount: { $sum: 1 },
        },
      },
      { $sort: { totalAmount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
    ]);

    const formattedLeaderboard = leaderboard.map((item, index) => ({
      rank: index + 1,
      userId: item._id,
      username: item.userInfo[0]?.username || item.username,
      totalDonated: item.totalAmount,
      donationCount: item.donationCount,
      tier: item.userInfo[0]?.tier || 'basic',
    }));

    res.json(formattedLeaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
