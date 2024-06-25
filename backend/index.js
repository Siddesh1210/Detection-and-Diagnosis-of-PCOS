import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConfig from "./db/dbConfig.js";
import userRoute from '../backend/routes/user.routes.js'
import pcosRoute from '../backend/routes/pcos.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
(() => {
  dbConfig();
})();

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/users",userRoute)
app.use("/pcos-test",pcosRoute)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
