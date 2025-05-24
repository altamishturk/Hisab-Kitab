import exporess from "express";
import {connect} from "./connection/db_connection";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

// routes 
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import timeRoutes from "./routes/time";
import emailRoutes from "./routes/email";
import cardRoutes from "./routes/card";

dotenv.config();
const app = exporess();
const port = process.env.PORT || 4000;


 
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


app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    connect();
})


