import { Request, Response, NextFunction } from 'express';


// wrapper for async middleware. Eliminates need to catch errors.
function catchError(handler : (req:Request, res:Response, next?:NextFunction) => Promise<void>) {

  return (req : Request, res : Response, next : NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

export default catchError;
