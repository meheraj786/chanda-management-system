import express from 'express';
import { getDistrictStats, getProfessionStats, getLeaderboard } from '../controllers/statsController';

const router = express.Router();

router.get('/districts', getDistrictStats);
router.get('/professions', getProfessionStats);
router.get('/leaderboard', getLeaderboard);

export default router;
