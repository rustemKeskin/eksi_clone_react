import express, { Request, Response} from 'express';
const firstApiRouter = express.Router();
import {
  titleValidation,
  entryValidation,
  authenticated,
  userNameValidation,
  passwordValidation,
  emailValidation
} from '../middleware/validator_functions';

//  TITLES

  // get titlelist
  firstApiRouter.get('/titles', async (req, res) => {

    let store = res.locals.store;
    let result = await store.getTitleList();
    res.json(result);
  })
  // find title id
  firstApiRouter.get('/titles/find-id', authenticated, async (req, res) => {

    const {titleName} = req.query;
    // check if titleName valid?
    let titleId = await res.locals.store.getTitleId(titleName);

    titleId ? res.status(200).json({id : titleId}).send() : res.status(400).send();
  })
  // get specific title's infos by name
  firstApiRouter.get('/titles/:title_name/name', authenticated, async (req, res) => {

    let store = res.locals.store;
    let title = req.params.title_name

    let valid = await store.validateTitle(title);

    if (valid) {
      let result = await store.getTitleByName(title);
      res.json(result);
    } else {
      res.status(404).json({messeage : 'invalid title name'});
    }
  })
  // get specific title's infos by id
  firstApiRouter.get('/titles/:title_id/id', authenticated, async (req, res) => {
    
    let store = res.locals.store;
    let title = await store.getTitleById(req.params.title_id);
    title ? res.json(title).send() : res.status(400).send()
  })
  // edit title name
  firstApiRouter.patch('/titles/:title_name', authenticated, 
    titleValidation, async(req : Request, res : Response) => {

      let store = res.locals.store;
      let oldTitle = req.params.title_name;
      let newTitle = req.body.newTitle;

    let result = await store.editTitle(newTitle, oldTitle)
    result ? res.status(204).send() : res.status(400).send();
  })
  // create title
  firstApiRouter.post('/titles', authenticated, async (req, res) => {
    // validate title
    // validate userId
    // validate newTitle
    let store = res.locals.store;
    let newTitle = req.body.newTitle;
    let userId = req.body.userId;

    let result = await store.newTitle(newTitle, userId);

    result ? res.json({message : `title ${newTitle} created`}) : res.status(400).json({message: 'request failed'})
  })
  // delete title
  firstApiRouter.delete('/titles/:titleName', authenticated, async (req, res) => {

    let store = res.locals.store;
    // check if user is owner of the title

    let result = await store.deleteTitle(req.params.titleName)
    result ? res.status(200).send() : res.status(400).send();
  })
  // get specific title's entries by titleId
  firstApiRouter.get('/titles/id/:titleId/entries', authenticated, async (req, res) => {
    // need validation and more
    let result = await res.locals.store.getTitleEntries(req.params.titleId);
    
    if (result) {
      res.json(result)
    } 
    res.sendStatus(400);
  })
  // get specific title's entries by name
  firstApiRouter.get('/titles/title_name/:titleName/entries', authenticated, async (req, res) => {
    // need validation and more
    let result = await res.locals.store.getEntries(req.params.titleName)
    if(result) {
      res.json({result, title: req.params.titleName})
    } else {
      res.json({message: 'request failed'})
    }
  })



//  USERS

  // get specific users's infos by name 1
  firstApiRouter.get('/users/:user_name/name', authenticated, async (req, res) => {

    let store = res.locals.store;
    let userName = req.params.user_name

    let valid = await store.validateUserName(userName);

    if (valid) {
      let result = await store.getUserInfoByName(userName);
      res.json(result).send();
    } else {
      res.status(404).json({messeage : 'invalid title name'}).send();
    }
  })
  // get specific users's infos by Id 2
  firstApiRouter.get('/users/:user_id/id', authenticated, async (req, res) => {

    let store = res.locals.store;
    let userId = req.params.user_id;

    let valid = await store.validateUserId(userId);

    if (valid) {
      let result = await store.getUserInfoById(userId);
      res.json(result).send();
    } else {
      res.status(404).json({messeage : 'invalid title id'}).send();
    }
  })
  // edit user name 3
  firstApiRouter.patch('/users/:user_name/name', authenticated, 
    userNameValidation, async(req : Request, res : Response) => {

      let store = res.locals.store;
      let oldName = req.params.user_name;
      let newName = req.body.newName;

    let result = await store.editUserName(newName, oldName);

    if (result) {  
      req.session.username = newName;
      res.status(204).send()
    } else {
      res.status(400).send();
    }
  })  
  // edit user password
  firstApiRouter.patch('/users/:user_name/password', authenticated, 
    passwordValidation, async(req : Request, res : Response) => {

    let store = res.locals.store;
    let user_name = req.params.user_name;
    let newPassword = req.body.newPassword;

    let result = await store.editUserPassword(user_name, newPassword);

    result ? res.status(204).send() : res.status(400).send();
  })
  // edit email
  firstApiRouter.patch('/users/:user_name/email', authenticated, 
    emailValidation, async(req : Request, res : Response) => {

    let store = res.locals.store;
    let user_name = req.params.user_name;
    let email = req.body.email;
  
    let result = await store.editUserEmail(user_name, email);

    result ? res.status(204).send() : res.status(400).send();
  })
  // get all usernames 4
  firstApiRouter.get('/users/usernames', authenticated, async(req, res) => {
    
    let store = res.locals.store;
    let result = await store.getUserNames();
    res.json(result);
  })
  // get all user emails 5
  firstApiRouter.get('/users/emails', authenticated, async(req, res) => {

    let store = res.locals.store;
    let result = await store.getEmails();
    res.json(result);
  })
  // get specific user's titles 6
  firstApiRouter.get('/users/my_titles', authenticated, async(req, res) => {

    let result = await res.locals.store.getTitles(req.session.username);

    result ? res.status(200).json(result).send() 
    : res.status(400).json({message:'invalid username'}).send();
  })
  // get specific user's entries   - 10
  firstApiRouter.get('/users/entries/:username', authenticated, async(req, res) => {
    // first validate parameter username
    let result = await res.locals.store.getMyEntries(req.params.username);
    result ? res.json(result).status(200) : res.status(400).json({message:'invalid username'});
  })
  // login login-7
  firstApiRouter.post('/users/login', async (req, res) => {
    
    let username = req.body.username;
    let password = req.body.password;
    let result = await res.locals.store.authenticate(username, password);

    if (result) {
      req.session.username = username;
      req.session.signedIn = true;
      let user = await res.locals.store.getUserInfoByName(username);
      res.json(user);
    } else {
      res.sendStatus(403)
    }
  })
  // logout logout-8
  firstApiRouter.post('/users/logout', authenticated, async (req, res) => {
    
    delete req.session.username;
    delete req.session.signedIn;
    res.status(204).send();
  })
  // create user
  firstApiRouter.post('/users', async (req, res) => {
    
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let result = await res.locals.store.signUp(username, email, password);

    if (result) {
      req.session.username = username;
      req.session.signedIn = true;
      res.json({message : `user ${username} created`});
    } else {
      res.status(400).json({message: 'request failed'});
    }
  })
  // delete user
  firstApiRouter.delete('/users/:user_name', authenticated, async (req, res) => {

    let store = res.locals.store;
    let username = req.params.user_name
    // check if user is actually user or admin

    let result = await store.deleteUser(username);

    if (result) {

      delete req.session.username;
      delete req.session.signedIn;

      res.status(204).send()
    } else {
      
      res.status(400).send();
    }
  })

//  ENTRIES

  // get specific entry's infos by Id
  firstApiRouter.get('/entries/:entry_id', authenticated, async(req, res) => {

    let store = res.locals.store;
    let entryId = req.params.entry_id;
  
    let result = await store.getEntry(entryId);
  
    result ? res.json(result): res.status(404).json({messeage : 'invalid title id'})
  })
  // edit entry
  firstApiRouter.patch('/entries/:entry_id', authenticated, async(req, res) => {

    let text = req.body.newContent
    let result = await res.locals.store.editEntry(req.params.entry_id, text)
    result ? res.sendStatus(204) : res.sendStatus(400);
  })
  // delete entry
  firstApiRouter.delete('/entries/:entry_id', authenticated, async(req, res) => {

    //  validate entry_id
    let result = res.locals.store.deleteEntry(req.params.entry_id);
    result ? res.sendStatus(204) : res.sendStatus(400);
  })
  // create entry
  firstApiRouter.post('/entries', authenticated, 
    entryValidation, async (req : Request, res : Response) => {

    let store = res.locals.store;
    let content = req.body.new_entry;
    let userId = req.body.userId;
    let titleId = req.body.titleId;
    // don't forget the validate all of them

    let result = await store.newEntry(content, userId, titleId);

    result ? res.json(result) : res.status(404).json({messeage : 'invalid title id'});
  })

//--------------



module.exports = firstApiRouter;

