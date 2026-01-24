import express from 'express';
import { getUserDonations } from '../controllers/donationController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.get('/donations', getUserDonations);

export default router;
