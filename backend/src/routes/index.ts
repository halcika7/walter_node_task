import { Router } from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import listRouter from './list';

const router = Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/list', listRouter);

export default router;