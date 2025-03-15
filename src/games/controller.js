import express from 'express';
import {Game} from "./Game.js";

const juegosRouter = express.Router();


export function showGameList(req, res) {

    let contenido = 'pages/listajuegos';

    console.log("DEBUG ::: CONTENIDO", contenido);


    const gameList = Game.getGameList();

    console.log("GAME LIST");
    console.log(gameList);

    res.render('page', {
        contenido,
        session: req.session,
        gameList: gameList
    });
}

export function showGameInfo(req, res) {

    let contenido = 'pages/game';

    let id = req.params.id;
    const game = Game.getGameById(id);


    console.log("GAME INFO");
    console.log(game);


    res.render('page', {
        contenido,
        session: req.session,
        game: game
    });
}
