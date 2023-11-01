import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { MongoPersistence } from './database/mongo_persistence';
import path from 'path';
import cookieParser from 'cookie-parser';

const firstApiRouter = require('./routes/firstApiRoutes');
const app:Express = express();

//  middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
const tokenBlacklist = new Set();

//  assign database
app.use((req, res, next) => {
  res.locals.store = new MongoPersistence();
  next();
});


app.get('/favicon.ico', (req : Request, res : Response) => {
  res.redirect('/images/favicon.ico')
})


// REACT static files 
app.use('/', express.static(path.join(__dirname, '..', 'client_one', 'dist')));
// api 
app.use('/api', firstApiRouter);


//  redirect unknown paths
app.all('*', (req, res) => {
  console.log('last redirect');
  console.log(req.originalUrl);
  res.redirect('/');
});

//  Error handler
app.use((err : Error, _req : Request, res : Response, _next : NextFunction) : void => {
  console.log(err);
  res.status(404).send(err.message);
});


export {app, tokenBlacklist};

