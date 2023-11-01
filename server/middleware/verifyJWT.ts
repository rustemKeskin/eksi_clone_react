import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction} from 'express';
import { ACCESS_TOKEN_SECRET } from '../config/config';

const verifyJWT = (req : any, res : Response, next : NextFunction) => {
  
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, decoded : any) => {
  
    if (err) return res.sendStatus(403);
    req.user = decoded.user_name;
    next();
  })
}

export default verifyJWT;

