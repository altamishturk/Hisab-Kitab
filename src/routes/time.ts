import express from "express";
import {getTimes, newTime, getUnpaidTimes,getTimeById, getpPaidTimes, updateTime, deleteTime,updateDescriptionAndImageOfTime} from  "../controllers/time";
import {isLoggedIn} from "../middlewares/auth";
const Router = express.Router();



// Router.get('/',getTimes);
// Router.get('/timeid/:id', getTimeById);
// Router.get('/paid', getpPaidTimes);
// Router.get('/unpaid', getUnpaidTimes);
// Router.post('/',newTime);
// Router.put('/:id',updateTime);
// Router.put('/update/:id',updateDescriptionAndImageOfTime);
// Router.delete('/:id',deleteTime);


export default Router