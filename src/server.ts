import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import "reflect-metadata";

import { router } from "./routes";

import "./database";

const app = express();

//Middlewares
app.use(express.json());
app.use(router);
//Error
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({error: err.message})
    }
    return response.status(500).json({status: "error", message: "Internal Server Error."})
})

app.listen(3003, () => console.log("Server is running"));