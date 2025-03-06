import express from 'express';
import {Juego} from "./Juego.js";

const juegosRouter = express.Router();


export function showGameList(req, res){

    let contenido = 'paginas/listajuegos';

    const gameList = Juego.getGameList();

    console.log("GAME LIST");
    console.log(gameList);

    res.render('pagina', {
        contenido,
        session: req.session,
        gameList: gameList
    });
}

export function showGameInfo(req, res){

    let contenido = 'paginas/videojuego/game';

    let id = req.params.id;
    const game = Juego.getGameById(id);

    console.log("GAME INFO");
    console.log(game);


    res.render('pagina', {
        contenido,
        session: req.session,
        game: game
    });
}