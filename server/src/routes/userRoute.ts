import { Router } from 'express';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { upload } from '../middleware/uploadImage.js';

import { CreateUserController } from '../controllers/user/CreateUserController.js';
import { LoginUserController } from '../controllers/user/LoginUserController.js';
import { DetailUserController } from '../controllers/user/DetailUserController.js';
import { UpdateUserController } from '../controllers/user/UpdateUserController.js';

const router = Router();

router.post('/register', CreateUserController.handle);
router.post('/session', LoginUserController.handle);

router.get('/me', isAuthenticated, DetailUserController.handle);

router.patch(
  '/',
  isAuthenticated,
  upload.single('image'),
  UpdateUserController.handle
);

const baseURL = '/user';

export { router, baseURL };
