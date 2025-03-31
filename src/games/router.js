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
juegosRouter.get('/listajuegos/page/:numPage', showGameList);
juegosRouter.post('/listajuegos/page/:numPage', showGameListSearched);
juegosRouter.get('/addGame', viewAddGameBD);
juegosRouter.post('/addGame', 
    body('title', 'No puede ser vacío').trim().notEmpty(), 
    body('description', 'No puede ser vacío').trim().notEmpty(), 
    body('rating', 'No puede ser vacío').trim().notEmpty(),
    body('rating', 'Valor entre 0 y 10').trim().isFloat({ min: 0, max: 10 }), 
    body('favNumber', 'No puede ser vacío').trim().notEmpty(), 
    body('favNumber', 'Valor entero mayor o igual que 0').trim().isInt({ min: 0 }), 
    body('company_id', 'No puede ser vacío').trim().notEmpty(), 
    body('company_id', 'Valor entero mayor o igual que 0').trim().isInt({ min: 0 }), 
    body('url_image', 'No puede ser vacío').trim().notEmpty(), 
    asyncHandler(doAddGameBD));
juegosRouter.get('/modifyGame/:id', viewModifyGameBD);
juegosRouter.post('/modifyGame/:id', 
    body('title', 'No puede ser vacío').trim().notEmpty(), 
    body('description', 'No puede ser vacío').trim().notEmpty(), 
    body('rating', 'No puede ser vacío').trim().notEmpty(),
    body('rating', 'Valor entre 0 y 10').trim().isFloat({ min: 0, max: 10 }), 
    body('favNumber', 'No puede ser vacío').trim().notEmpty(), 
    body('favNumber', 'Valor entero mayor o igual que 0').trim().isInt({ min: 0 }), 
    body('company_id', 'No puede ser vacío').trim().notEmpty(), 
    body('company_id', 'Valor entero mayor o igual que 0').trim().isInt({ min: 0 }), 
    body('url_image', 'No puede ser vacío').trim().notEmpty(), 
    asyncHandler(doModifyGameBD));
juegosRouter.get('/:id', showGameInfo);
juegosRouter.post('/deleteGame/:id', doDelete);


export default juegosRouter; // en routers poner esto siempre para importar todo

// para funciones individuales export en la funcion (utilidades)
// para clases export default aunque tambien puede interesar export
