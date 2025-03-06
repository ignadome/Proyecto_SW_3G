import express from 'express';
import {Juego} from "./Juego.js";
import {showGameInfo, showGameList} from "./controller.js";

const juegosRouter = express.Router();

juegosRouter.get('/listajuegos', showGameList);

juegosRouter.get('/:id', showGameInfo);

export default juegosRouter; // en routers poner esto siempre para importar todo

// para funciones individuales export en la funcion (utilidades)
// para clases export default aunque tambien puede interesar export