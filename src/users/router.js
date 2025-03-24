import express from 'express';
import { viewLogin, doLogin, doLogout, doRegister,viewRegister,viewUserList,showUserSearch,deleteUser } from './controller.js';

const usersRouter = express.Router();

usersRouter.get('/login', viewLogin);
usersRouter.post('/login', doLogin);
usersRouter.get('/logout', doLogout);
usersRouter.post('/register', doRegister);
usersRouter.get('/register',viewRegister);
usersRouter.get('/listausuarios',viewUserList);
usersRouter.post('/listausuarios',showUserSearch);
usersRouter.post('/delete/:username',deleteUser);
export default usersRouter;