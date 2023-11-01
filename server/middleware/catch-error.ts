import { Request, Response, NextFunction } from 'express';

function catchError(handler : (req:Request, res:Response, next?:NextFunction) => Promise<void>) {

  return (req : Request, res : Response, next : NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

export default catchError;
