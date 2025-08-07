import { Request, Response } from 'express';
import { Person } from '../models/person';

// ✅ Create a new person
export const createPerson = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber } = req.body;

    const person = new Person({ name, email, phoneNumber });
    const saved = await person.save();

    res.status(201).json({person: saved});
  } catch (error) {
    res.status(500).json({ message: 'Failed to create person', error });
  }
};

// ✅ Get all people
export const getAllPeople = async (_req: Request, res: Response) => {
  try {
    const people = await Person.find().sort({ updatedAt: -1 });

    res.json({people});

  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch people', error });
  }
};

// ✅ Get a person by ID
export const getPersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const person = await Person.findById(id);

    if(!person){
        throw new Error("Person not found")
        // if (!person) return res.status(404).json({ message: 'Person not found' });
    }

    res.json(person);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch person', error });
  }
};

// ✅ Update a person
export const updatePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Person.findByIdAndUpdate(id, req.body, { new: true });

    if(!updated){
        throw new Error("Person not found");
        // if (!updated) return res.status(404).json({ message: 'Person not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update person', error });
  }
};

// ✅ Delete a person
export const deletePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Person.findByIdAndDelete(id);
    
    if (!deleted){
        throw new Error("Person not found");
        // return res.status(404).json({ message: 'Person not found' })
    };
    
    res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete person', error });
  }
};
