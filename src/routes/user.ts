import { Router } from "express";
import {getLoggedInUser} from "../controllers/user";
import {isLoggedIn} from "../middlewares/auth";
const router = Router();



router.get('/', isLoggedIn,getLoggedInUser)


export default router;