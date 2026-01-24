import express from 'express';
import { createDonation } from '../controllers/donationController';
import { optionalAuth } from '../middlewares/authMiddleware';

const router = express.Router();

// We use optionalAuth here because a user can donate without being logged in
// But if they are logged in, we want to associate the donation with their account
router.post('/', optionalAuth, createDonation);

export default router;
