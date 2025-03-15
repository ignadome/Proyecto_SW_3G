import express from 'express';
import {doLogin, doLogout, doRegister, viewLogin, viewRegister} from './controller.js';

const usersRouter = express.Router();

usersRouter.get('/login', viewLogin);
usersRouter.post('/login', doLogin);
usersRouter.get('/logout', doLogout);
usersRouter.post('/register', doRegister);
usersRouter.get('/register', viewRegister)
export default usersRouter;