import express from 'express';
import { viewLogin, doLogin, doLogout } from './controller.js';

const usersRouter = express.Router();

usersRouter.get('/login', viewLogin);
usersRouter.post('/login', doLogin);
usersRouter.get('/logout', doLogout);

export default usersRouter;