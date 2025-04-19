import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "./config";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token){
        res.status(403).json({msg:"token must be provided"})
        return
    }
    try {
        const decoded=jwt.verify(token,config.JWT_SECRET)

        if(decoded){
            //@ts-ignore
            req.userId=decoded.id;
            // @ts-ignore
            // console.log(req.userId)
            next();
        }else{
            res.status(403).json({
                msg:"You are not authorized"
            })
            return
        }
    } catch (error) {
        res.status(403).json({msg:"authentication erro:",error})
    }
}