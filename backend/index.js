import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from "./routes/auth.routes.js";
// import db
import { pool } from './db/db.js';

// config keys
dotenv.config();
const PORT = process.env.PORT || 8000;

// base
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// routers
app.use("/auth", authRouter);
// app.use("/api/customers", customerRouter);

// initial
app.get("/", (req, res) => {
    res.send("Works!");
})
app.listen(PORT, () => {
    console.log(`Server functions at port: ${PORT}. Please stay tuned for more updates!`)
})