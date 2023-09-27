import express, { Express, Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';

async function checkLogin(req:Request, res:Response, next:NextFunction) {

  if (!res.locals.signedIn) {
    // I am gonna use it after signed in
    req.session.redirectTo = req.originalUrl;
    await renderSignIn(req, res);

  } else {
    next();
  }
}
async function renderSignIn (req:Request, res:Response) {
  let titleList : string[] = await res.locals.store.getTitleList();
  res.render('signin', {titleList, flash : req.flash() } );
}
function renderSignUp (req:Request, res:Response) {
  res.render("signup", {
    flash: req.flash(),
    username : req.body.username,
    email : req.body.email,
    password1 : req.body.password1,
    password2 : req.body.password2,
  });
}
async function renderHome (req:Request, res:Response) {
  
  let store = res.locals.store;
  let titleList = await store.getTitleList();
  let username = req.session.username;
  let userId = await store.getUserId(username);

  res.render('layout', { titleList, flash : req.flash(), signedIn : req.session.signedIn, userId });
}
async function renderTitle (req:Request, res:Response, customTitle = undefined) {

  let store = res.locals.store;
  let signedIn = res.locals.signedIn;
  let username = res.locals.username;
  let currentPage = Number(req.query.p || '1');
  let title = customTitle || req.params.title;

  let rows = await store.getEntries(title);
  let titleArr = await store.getTitles(username);
  let userId = await store.getUserId(username);
  let titleList = await store.getTitleList();

  // page query parameter control
  let pages = [];
  for (let index = 1; index <= (rows.length / 7) + 1; index++) {
    pages.push(index);
  }

  if (title === 'signin') {
    renderHome(req, res);
  } else if (await store.validateTitle(title)) {

    if (currentPage > (rows.length / 7) + 1 ) {

      req.flash('error', 'page not found');
      res.render('title', { rows, titleList, title, signedIn, username, userId, pages, titleArr, flash : req.flash() });
    } else if (currentPage <= 0 || isNaN(currentPage)) {

      req.flash('error', 'page not found');
      res.render('title', { rows, titleList, title, signedIn, username, userId, pages, titleArr, flash : req.flash() });
    } else {

      rows = rows.slice((currentPage - 1) * 7, ((currentPage - 1) * 7) + 7);
      res.render('title', { rows, titleList, title, signedIn, username, userId, pages, titleArr, flash : req.flash() });
    }
  } else {
    req.flash('error','Invalid title');
    renderHome(req, res);
  }
}
async function renderProfile(_req:Request, res:Response) {

  let username = res.locals.username as string;
  let profileEntries : Array<any> = await res.locals.store.getMyEntries(username);

  let userId = await res.locals.store.getUserId(username);

  profileEntries = profileEntries.map(el => {

    let entries : any = {}

    for (let index=0; index < el.entries.length; index++) {
      entries[el.entry_ids[index]] = el.entries[index]
    }

    return { title : el.title, entries, image_url:el.image_url}
  });

  res.render('profile', { result : profileEntries, username, userId });
}
async function renderSettings(_req:Request, res:Response) {

  let store = res.locals.store;
  let username = res.locals.username;
  let userId = await store.getUserId(username);

  res.render('settings', { username, userId } );
}

export {
  checkLogin,
  renderSignIn,
  renderSignUp,
  renderTitle,
  renderHome,
  renderProfile,
  renderSettings
}
