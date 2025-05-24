import { Router } from "express";
import {getLoggedInUser} from "../controllers/user";
import {isLoggedIn, isAuthorized} from "../middlewares/auth";
const router = Router();
const { check} = require('express-validator');

let signupvalidation = [
    check('firstname')
.isLength({ min: 3 })
.withMessage('first name must be at least 3 chars long'),
check('lastname')
.isLength({ min: 3 })
.withMessage('last name must be at least 3 chars long'),
check('email')
.isEmail()
.withMessage('Email is required'),
check('password')
.isLength({ min: 3 })
.withMessage('password must be at least 3 chars long')
]


// router.get('/loggedinuser', isLoggedIn,getLoggedInUser)
// router.post('/', signupvalidation ,signup)
// router.post('/login', login)
// router.post('/logout', isLoggedIn,logout)


export default router;