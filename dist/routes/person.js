"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const person_1 = require("../controllers/person");
const router = express_1.default.Router();
router.post('/', person_1.createPerson);
router.get('/', person_1.getAllPeople);
router.get('/:id', person_1.getPersonById);
router.put('/:id', person_1.updatePerson);
router.delete('/:id', person_1.deletePerson);
exports.default = router;
