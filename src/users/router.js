import express from 'express';
import { viewLogin, doLogin, doLogout,viewLogin,doSignUp } from './controller.js';

const usersRouter = express.Router();

usersRouter.get('/login', viewLogin);
usersRouter.post('/login', doLogin);
usersRouter.get('/logout', doLogout);
usersRouter.get('/signUp',viewSignUp);
usersRouter.post('/signUp',doSignUp);

export default usersRouter;