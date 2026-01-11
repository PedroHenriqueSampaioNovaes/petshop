import { Router } from 'express';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { upload } from '../middleware/uploadImage.js';

import { CreatePetController } from '../controllers/pet/CreatePetController.js';
import { ListAllPetsController } from '../controllers/pet/ListAllPetsController.js';
import { ListAllUserPetsController } from '../controllers/pet/ListAllUserPetsController.js';
import { GetPetController } from '../controllers/pet/GetPetController.js';
import { RemovePetController } from '../controllers/pet/RemovePetController.js';
import { UpdatePetController } from '../controllers/pet/UpdatePetController.js';

const router = Router();

router.post(
  '/create',
  isAuthenticated,
  upload.array('images'),
  CreatePetController.handle
);

router.get('/', ListAllPetsController.handle);
router.get('/mypets', isAuthenticated, ListAllUserPetsController.handle);
// router.get('/myadoptions', isAuthenticated, PetController.getAllUserAdoptions);
router.get('/:id', GetPetController.handle);

router.delete('/:id', isAuthenticated, RemovePetController.handle);

router.patch(
  '/:id',
  isAuthenticated,
  upload.array('images'),
  UpdatePetController.handle
);
// router.patch('/schedule/:id', isAuthenticated, PetController.schedule);
// router.patch('/conclude/:id', isAuthenticated, PetController.concludeAdoption);

const baseURL = '/pet';

export { router, baseURL };
