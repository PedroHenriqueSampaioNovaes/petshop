import { Router } from 'express';

import { CreateUserController } from '../controllers/user/CreateUserController.js';

const router = Router();

router.post('/register', CreateUserController.handle);
// router.post('/session', LoginUserController.handle);

// router.get('/me', isAuthenticated, DetailUserController.handle);
export { router };
