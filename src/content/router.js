import express from 'express';
import {viewContenidoAdmin, viewContenidoJournal, viewContenidoNormal} from './controller.js';

const contentRouter = express.Router();

contentRouter.get('/normal', viewContenidoNormal);
contentRouter.get('/admin', viewContenidoAdmin);
contentRouter.get('/journal', viewContenidoJournal);

export default contentRouter;