import express from 'express';
import {Game} from "./Game.js";

const juegosRouter = express.Router();


export function showGameList(req, res){

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

export function showGameListSearched(req, res){

    let contenido = 'pages/listajuegos';

    const title = req.body.game_title.trim();

    const gameList = Game.getSearchedGameList(title, 50, 0);

    console.log("GAME LIST SEARCHED");
    console.log(gameList);

    res.render('page', {
        contenido,
        session: req.session,
        gameList: gameList
    });
}

export function showGameInfo(req, res){

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

export function viewAddGameBD(req, res){

    let contenido = 'pages/addGamePage';

    res.render('page', {
        contenido,
        session: req.session
    });
}


export function doAddGameBD(req, res){

    const title = req.body.title.trim();
    const description = req.body.description.trim();
    const rating = Number(req.body.rating.trim());
    const favNumber = parseInt(req.body.favNumber.trim());
    const company_id = parseInt(req.body.company_id.trim());

    try {
        const game = new Game(title, description,rating, favNumber, "elden_ring.png" ,company_id, null);

        console.log("GAME INFO");
        console.log(game);

        const game2 =  Game.insert(game);
        console.log(game2);

        return res.render('page', {
            contenido: 'pages/addGamePage',
            session: req.session,
            exito: 'Juego insertado con exito en la Base de Datos'
        });

    } catch (e) {
        res.render('page', {
            contenido: 'pages/addGamePage',
            error: 'ERROR al insertar juego en la Base de Datos'
        })
    }
}