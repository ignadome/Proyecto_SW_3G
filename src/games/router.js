import express from 'express';
import {Game} from "./Game.js";
import {showGameInfo, showGameList, showGameListSearched,  viewAddGameBD,
     doAddGameBD, viewModifyGameBD,doModifyGameBD } from "./controller.js";

const juegosRouter = express.Router();

juegosRouter.get('/gameLists', (req, res) => {
    
    let contenido = 'pages/gameLists';
    
    res.render('page', {
        contenido,  
        console.log("Hola");
        session: req.session
    });
});
juegosRouter.get('/listajuegos', showGameList);
juegosRouter.post('/listajuegos', showGameListSearched);
juegosRouter.get('/addGame', viewAddGameBD);
juegosRouter.post('/addGame', doAddGameBD);
juegosRouter.get('/modifyGame/:id', viewModifyGameBD);
juegosRouter.post('/modifyGame/:id', doModifyGameBD);
juegosRouter.get('/:id', showGameInfo);


export default juegosRouter; // en routers poner esto siempre para importar todo

// para funciones individuales export en la funcion (utilidades)
// para clases export default aunque tambien puede interesar export
