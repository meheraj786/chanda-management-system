const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      enum: ['Doctor', 'Engineer', 'Teacher', 'Student', 'Businessman', 'Unemployed', 'Others'],
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);
