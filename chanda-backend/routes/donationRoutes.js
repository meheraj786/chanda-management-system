const express = require('express');
const {
  createDonation,
  getAllDonations,
  getDistrictStats,
  getProfessionStats,
  getLeaderboard,
} = require('../controllers/donationController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', (req, res, next) => {
  // Make authMiddleware optional for donations
  if (req.headers.authorization) {
    authMiddleware(req, res, () => next());
  } else {
    next();
  }
});

router.post('/', createDonation);
router.get('/', getAllDonations);
router.get('/stats/districts', getDistrictStats);
router.get('/stats/professions', getProfessionStats);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
