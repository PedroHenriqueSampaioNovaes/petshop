import { Router } from 'express';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { createUploadImage } from '../middleware/uploadImage.js';

import { CreatePetController } from '../controllers/pet/CreatePetController.js';

const router = Router();

router.post(
  '/create',
  isAuthenticated,
  createUploadImage('pets').array('images'),
  CreatePetController.handle
);
// router.get('/', PetController.getAll);
// router.get('/mypets', isAuthenticated, PetController.getAllUserPets);
// router.get('/myadoptions', isAuthenticated, PetController.getAllUserAdoptions);
// router.get('/:id', PetController.getPetById);
// router.delete('/:id', isAuthenticated, PetController.removePetById);
// router.patch(
//   '/:id',
//   isAuthenticated,
//   createUploadImage('pets').array('images'),
//   // errorHandler,
//   PetController.updatePet
// );
// router.patch('/schedule/:id', isAuthenticated, PetController.schedule);
// router.patch('/conclude/:id', isAuthenticated, PetController.concludeAdoption);

const baseURL = '/pet';

export { router, baseURL };
