import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './Configs/ServerConfig.js';
import paymentRouter from './Router/paymentRouter.js';
import connectDB from './Configs/DbConfig.js';
import cors from 'cors';

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors());

app.use("/api", paymentRouter);

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    connectDB();
});