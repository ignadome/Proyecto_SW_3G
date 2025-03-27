import express from 'express';
import { viewContenidoNormal,viewContenidoAdmin,viewContenidoJournal } from './controller.js';

const contentRouter=express.Router();

contentRouter.get('/normal',viewContenidoNormal);
contentRouter.get('/admin',viewContenidoAdmin);
contentRouter.get('/journal',viewContenidoJournal);

export default contentRouter;