import express, { Express, Response, Request } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from 'path';

const app: Express = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve("public")));

app.use(cookieParser());

//* --Api routes

import userRouter from './routes/user.route.js';

app.use("/api/v1/users",userRouter)

export { app };