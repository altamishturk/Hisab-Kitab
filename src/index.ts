import exporess from "express";
import {connect} from "./connection/db_connection";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import expressListEndpoints  from "express-list-endpoints"

// routes 
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import timeRoutes from "./routes/time";
import emailRoutes from "./routes/email";
import cardRoutes from "./routes/card";
import cropRoutes from "./routes/crop";
import personRoutes from "./routes/person";
import borrowTransactionRoutes from "./routes/borrowTransaction";

dotenv.config();
const app = exporess();
const port = process.env.PORT || 4001;


connect();

// middlewares 
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('tiny'));


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/times",timeRoutes);
app.use("/api/v1/emails",emailRoutes);
app.use("/api/v1/cards",cardRoutes);
app.use("/api/v1/crops",cropRoutes);
app.use("/api/v1/people",personRoutes);
app.use("/api/v1/borrow-transactions",borrowTransactionRoutes);


const endpoints = expressListEndpoints(app);
console.log(endpoints)


app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})


