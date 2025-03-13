import express from 'express';
import {Game} from "./Game.js";
import {showGameInfo, showGameList} from "./controller.js";

const juegosRouter = express.Router();

juegosRouter.get('/gameLists', (req, res) => {
    
    let contenido = 'pages/gameLists';
    
    res.render('page', {
        contenido,  
        session: req.session
    });
});

juegosRouter.get('/listajuegos', showGameList);

juegosRouter.get('/:id', showGameInfo);

export default juegosRouter; // en routers poner esto siempre para importar todo

// para funciones individuales export en la funcion (utilidades)
// para clases export default aunque tambien puede interesar export
