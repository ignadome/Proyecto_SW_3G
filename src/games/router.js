import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';
import express from 'express';

import { autenticado } from '../middleware/auth.js';
import {
    doAddGameBD,
    doDelete,
    doModifyGameBD,
    showGameInfo,
    showGameList,
    showGameListSearched,
    viewAddGameBD,
    viewModifyGameBD
} from "./controller.js";

const juegosRouter = express.Router();

juegosRouter.get('/gameLists', (req, res) => {

    let contenido = 'pages/gameLists';

    res.render('page', {
        contenido,
        session: req.session
    });
});
juegosRouter.get('/listajuegos', showGameList);
juegosRouter.post('/listajuegos', showGameListSearched);
juegosRouter.get('/addGame', viewAddGameBD);
juegosRouter.post('/addGame', 
    body('title', 'No puede ser vacío').trim().notEmpty(), 
    body('description', 'No puede ser vacío').trim().notEmpty(), 
    body('rating', 'No puede ser vacío').trim().notEmpty(), 
    body('favNumber', 'No puede ser vacío').trim().notEmpty(), 
    body('company_id', 'No puede ser vacío').trim().notEmpty(), 
    asyncHandler(doAddGameBD));
juegosRouter.get('/modifyGame/:id', viewModifyGameBD);
juegosRouter.post('/modifyGame/:id', doModifyGameBD);
juegosRouter.get('/:id', showGameInfo);
juegosRouter.post('/deleteGame/:id', doDelete);


export default juegosRouter; // en routers poner esto siempre para importar todo

// para funciones individuales export en la funcion (utilidades)
// para clases export default aunque tambien puede interesar export
