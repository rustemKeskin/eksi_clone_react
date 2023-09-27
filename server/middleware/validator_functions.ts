import { body, validationResult } from 'express-validator';
import express, { Express, Request, Response, NextFunction } from 'express';

const signUpValidation = [
  body('username')
    .trim()
    .isLength({min : 1})
    .withMessage("The username is required.")
    .isLength({ max: 20 })
    .withMessage("The username must be between 1 and 20 characters."),
  body('email')
    .trim()
    .isLength({min : 5})
    .withMessage("The email is required.")
    .isLength({ max: 100 })
    .withMessage("The email must be between 1 and 100 characters."),
  body('password1')
    .trim()
    .isLength({min : 1})
    .withMessage("The password is required.")
    .isLength({ max: 25 })
    .withMessage("The password must be between 1 and 25 characters."),
  body('password2')
    .trim()
    .isLength({min : 1})
    .withMessage("The password is required.")
    .isLength({ max: 25 })
    .withMessage("The password must be between 1 and 25 characters."),

  (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const titleValidation = [
  body('newTitle')
    .trim()
    .isLength({min : 1})
    .withMessage("The title is required.")
    .isLength({ max: 80 })
    .withMessage("The entry must be between 1 and 80 characters."),
  (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const entryValidation = [
  body('new_entry')
    .trim()
    .isLength({min : 1})
    .withMessage("The entry is required.")
    .isLength({ max: 500 })
    .withMessage("The entry must be between 1 and 500 characters."),

  (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const userNameValidation = [
  body('newName')
    .trim()
    .isLength({min : 1})
    .withMessage("The name is required.")
    .isLength({ max: 20 })
    .withMessage("The name must be between 1 and 20 characters."),

  (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const passwordValidation = [
  body('newPassword')
    .trim()
    .isLength({min : 1})
    .withMessage("password required.")
    .isLength({ max: 20 })
    .withMessage("password must be between 1 and 20 characters."),

  (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const emailValidation = [
  body('email')
    .trim()
    .isLength({min : 5})
    .withMessage("The email is required.")
    .isLength({ max: 100 })
    .withMessage("The email must be between 1 and 100 characters."),

  (req : Request, res : Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

function authenticated(req : Request, res : Response, next: NextFunction) {

  if (!res.locals.signedIn) {
    
    res.status(400).json({message : 'Authentication required'}).send();

  } else {
    next();
  }
}

export  {
  signUpValidation,
  titleValidation,
  entryValidation,
  userNameValidation,
  passwordValidation,
  emailValidation,
  authenticated
};


