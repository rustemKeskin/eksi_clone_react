const config = require('./config/config');
import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import flash from 'express-flash';
import session from 'express-session';
import { MongoPersistence } from './database/mongo_persistence';
import path from 'path';

const firstApiRouter = require('./routes/firstApiRoutes');
const app:Express = express();

// declaration merging
declare module 'express-session' {
  interface SessionData {
    username?  : string;
    redirectTo?: string;
    signedIn?  : boolean;
    flash? : string;
    db? : string;
  }
}

//  configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//  middlewares
app.use(express.json());
app.use(morgan('common'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  cookie : {
    httpOnly : true,
    maxAge : 24 * 60 * 60 * 1000, // one day
    secure : false,
    path : '/'
  },
  name : 'eksiClone-session-id',
  resave : false,
  saveUninitialized : true,
  secret : config.SECRET as string,
  // store : new LokiStore({})
}));

app.use(flash());

//  Extract session info
app.use((req, res, next) => {

  res.locals.username = req.session.username;
  res.locals.signedIn = req.session.signedIn;
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});
//  assign database
app.use(async(_req, res, next ) => {

  res.locals.store = new MongoPersistence();
  res.locals.titleList = await res.locals.store.getTitleList();
  next();
});


app.get('/favicon.ico', (req : Request, res : Response) => {
  console.log('here favicon ico')
  res.status(301)
})


// first_project REACT static files 
app.use('/first_project/', express.static(path.join(__dirname, '..', 'client_one', 'dist')));
// first project api 
app.use('/first_project/api', firstApiRouter);


//  redirect unknown paths
app.all('*', (req, res) => {
  console.log('last redirect');
  console.log( req.originalUrl);
  res.redirect('/first_project');
});

//  Error handler
app.use((err : Error, _req : Request, res : Response, _next : NextFunction) : void => {
  console.log(err);
  res.status(404).send(err.message);
});


module.exports = app;

