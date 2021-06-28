import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){

    const authToken = req.headers.authorization;
    const [, token] = authToken.split(" ");

    if(!authToken){
        return res.status(401).end();
    }

    try {
        const {sub} = verify(token ,"6425ddbf9cd648e1e4d33c4340d3373d") as IPayload;

        req.user_id = sub;
        
        return next();
    } catch (error) {
        return res.status(401).end();
    }
}