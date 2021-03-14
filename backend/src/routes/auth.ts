import { authMiddleware } from '@middleware/auth';
import { Router } from 'express';
import { register, login, refresh, logout } from '@controller/Auth';
import { registerValidation } from '@validation/auth';

const router = Router();

router.post('/', login);
router.post('/register', registerValidation, register);
router.get('/refresh', refresh);
router.post('/logout', authMiddleware, logout);

export default router;
