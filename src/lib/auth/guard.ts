import { noToken } from "../../app/auth/errors";
import jwt, {JwtPayload} from 'jsonwebtoken';
import { env } from "../config/env.js";
import { NextFunction,Request,Response } from "express";

export function authGuard( req: Request, res:Response, next: NextFunction ) {
    try {
        const token = req.cookies.access_token;
        if ( !token ) throw noToken;
        req.user = jwt.verify( token, env.jwt.secretAccessKey ) as JwtPayload
        next();

    } catch ( error ) {
        next( error );
    }

}