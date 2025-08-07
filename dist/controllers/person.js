"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.updatePerson = exports.getPersonById = exports.getAllPeople = exports.createPerson = void 0;
const person_1 = require("../models/person");
// ✅ Create a new person
const createPerson = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        const person = new person_1.Person({ name, email, phoneNumber });
        const saved = await person.save();
        res.status(201).json({ person: saved });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create person', error });
    }
};
exports.createPerson = createPerson;
// ✅ Get all people
const getAllPeople = async (_req, res) => {
    try {
        const people = await person_1.Person.find().sort({ updatedAt: -1 });
        res.json({ people });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch people', error });
    }
};
exports.getAllPeople = getAllPeople;
// ✅ Get a person by ID
const getPersonById = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await person_1.Person.findById(id);
        if (!person) {
            throw new Error("Person not found");
            // if (!person) return res.status(404).json({ message: 'Person not found' });
        }
        res.json(person);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch person', error });
    }
};
exports.getPersonById = getPersonById;
// ✅ Update a person
const updatePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await person_1.Person.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            throw new Error("Person not found");
            // if (!updated) return res.status(404).json({ message: 'Person not found' });
        }
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update person', error });
    }
};
exports.updatePerson = updatePerson;
// ✅ Delete a person
const deletePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await person_1.Person.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error("Person not found");
            // return res.status(404).json({ message: 'Person not found' })
        }
        ;
        res.json({ message: 'Person deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete person', error });
    }
};
exports.deletePerson = deletePerson;
