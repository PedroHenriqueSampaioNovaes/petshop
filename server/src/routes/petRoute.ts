import { Router } from 'express';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { upload } from '../middleware/uploadImage.js';

import { CreatePetController } from '../controllers/pet/CreatePetController.js';
import { ListAllPetsController } from '../controllers/pet/ListAllPetsController.js';
import { ListAllUserPetsController } from '../controllers/pet/ListAllUserPetsController.js';
import { GetPetController } from '../controllers/pet/GetPetController.js';
import { RemovePetController } from '../controllers/pet/RemovePetController.js';
import { UpdatePetController } from '../controllers/pet/UpdatePetController.js';
import { SchedulePetController } from '../controllers/pet/SchedulePetController.js';
import { AllUserAdoptionsPetController } from '../controllers/pet/AllUserAdoptionsPetController.js';
import { ConcludeAdoptionPetController } from '../controllers/pet/ConcludeAdoptionPetController.js';

const router = Router();

router.post('/create', isAuthenticated, CreatePetController.handle);

router.get('/', ListAllPetsController.handle);
router.get('/mypets', isAuthenticated, ListAllUserPetsController.handle);
router.get(
  '/myadoptions',
  isAuthenticated,
  AllUserAdoptionsPetController.handle,
);
router.get('/:id', GetPetController.handle);

router.delete('/:id', isAuthenticated, RemovePetController.handle);

router.patch('/:id', isAuthenticated, UpdatePetController.handle);
router.patch('/schedule/:id', isAuthenticated, SchedulePetController.handle);
router.patch(
  '/conclude/:id',
  isAuthenticated,
  ConcludeAdoptionPetController.handle,
);

const baseURL = '/pets';

export { router, baseURL };
