import { Router } from "express";
import { addGaveMoney, addReceivedMoney, createCard, getCards, getVillages } from "../controllers/card";
import { isLoggedIn } from "../middlewares/auth";
const router = Router();



router.get("/",isLoggedIn,getCards);
router.get("/villages",isLoggedIn,getVillages);
router.post("/",isLoggedIn,createCard);
router.post("/add/receive/:cardId",isLoggedIn,addReceivedMoney);
router.post("/add/gave/:cardId",isLoggedIn,addGaveMoney);



export default router;