import { Router } from 'express';

import {
  getAllNames,
  getSpecificName,
  getRandomName,
  getRange,
} from '../controllers/namesController.js';

const router = Router();

// this call gets all the 99 names
router.get('/api/v1/names', getAllNames);

// this call gets a random name
router.get('/api/v1/name/random', getRandomName);

// this call gets a specific name based on the idea
// the names are in order so "0" would get the name Allah
router.get('/api/v1/name/:id', getSpecificName);

// this will call the range of names specified by the user
// a list chosen by user starting from range to other
router.get('/api/v1/names/range/:id,:id2', getRange);

export default router;
