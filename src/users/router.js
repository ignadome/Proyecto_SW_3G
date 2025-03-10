import express from 'express';
import { viewLogin, doLogin, doLogout, doRegister,viewRegister } from './controller.js';

const usersRouter = express.Router();

usersRouter.get('/login', viewLogin);
usersRouter.post('/login', doLogin);
usersRouter.get('/logout', doLogout);
usersRouter.post('/login', doRegister);
usersRouter.get('/login',viewRegister)
export default usersRouter;