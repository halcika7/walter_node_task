import { authMiddleware } from '@middleware/auth';
import { Router } from 'express';
import { changePassword } from '@controller/Profile';
import { changePasswordValidation } from '@validation/auth';

const router = Router();

router.put('/', authMiddleware, changePasswordValidation, changePassword);

export default router;
