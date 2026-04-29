import { Router } from 'express';

import isAuthenticated from '../middleware/isAuthenticated.js';

import { GenerateSignatureImageController } from '../controllers/image/generateSignatureImageController.js';

const router = Router();

router.post(
  '/generate-signature/:folder',
  isAuthenticated,
  GenerateSignatureImageController.handle,
);

const baseURL = '/images';

export { router, baseURL };
