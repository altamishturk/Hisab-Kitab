import express from 'express';
import {
  createPerson,
  getAllPeople,
  getPersonById,
  updatePerson,
  deletePerson
} from '../controllers/person';

const router = express.Router();

router.post('/', createPerson);
router.get('/', getAllPeople);
router.get('/:id', getPersonById);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

export default router;
