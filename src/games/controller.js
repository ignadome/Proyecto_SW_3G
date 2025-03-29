import express from 'express';
import {Game} from "./Game.js";
import {Review} from "../reviews/Review.js";
import {Genre} from "../genres/Genre.js"

import { render } from '../utils/render.js';
import { validationResult, matchedData } from 'express-validator';
import {logger} from '../logger.js'; 

const juegosRouter = express.Router();


export function showGameList(req, res) {

    let contenido = 'pages/listajuegos';

    const gameList = Game.getGameList();

    res.render('page', {
        contenido,
        session: req.session,
        gameList: gameList,
    });
}

export function showGameListSearched(req, res) {

    let contenido = 'pages/listajuegos';

    const title = req.body.game_title.trim();
    const order_option = req.body.order_option;
    let order;
    switch (order_option) {
        case "optionAlfabetico":
            order = "title";
            break;
        case "optionNota":
            order = "rating";
            break;
        case "optionNumFavoritos":
            order = "favNumber";
            break;
        default:
            order = "id";
            break;
    }

    const asc_desc_option = req.body.asc_desc_option;
    let order_dir;
    switch (asc_desc_option) {
        case "optionDesc":
            order_dir = 'DESC';
            break;
        case "optionAsc":
            order_dir = 'ASC';
            break;
        default:
            order_dir = 'ASC';
    }

    const gameList = Game.getSearchedGameList(title, order, order_dir, 50, 0);

    console.log("GAME LIST SEARCHED");
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
    const reviewListByGameId = Review.getAllReviewsByGameId(id);
    const genres = Genre.getGameGenres(game);

    res.render('page', {
        contenido,
        session: req.session,
        game: game,
        reviewList: reviewListByGameId,
        genreList: genres
    });
}

export function viewAddGameBD(req, res) {

    let contenido = 'pages/addGamePage';

        /*
    res.render('page', {
        contenido,
        session: req.session,
        errores: {}
    });*/
    render(req, res, contenido, {
        errores: {}
    });
}


export function doAddGameBD(req, res) {
    const result = validationResult(req);
    if (! result.isEmpty()) {
        const errores = result.mapped();
        const datos = matchedData(req);
        return render(req, res, 'pages/addGamePage', {
            datos,
            errores
        });
    }


    const title = req.body.title.trim();
    const description = req.body.description.trim();
    const rating = Number(req.body.rating.trim());
    const favNumber = parseInt(req.body.favNumber.trim());
    const company_id = parseInt(req.body.company_id.trim());

    try {
        const game = new Game(title, description, rating, favNumber, "elden_ring.png", company_id, null);

        console.log("GAME INFO");
        console.log(game);

        const game2 = Game.insert(game);
        console.log(game2);

        /*
        return res.render('page', {
            contenido: 'pages/homeUser',
            session: req.session,
            exito: 'Juego insertado con exito en la Base de Datos'
        });*/
        render(req, res, contenido, {
            errores: {},
            exito: 'Juego insertado con exito en la Base de Datos'
        });
    
        //return res.redirect('/pages/homeUser');

    } catch (e) {
        /*
        res.render('page', {
            contenido: 'pages/addGamePage',
            error: 'ERROR al insertar juego en la Base de Datos'
        })*/
        logger.error(`Error al hacer inserción de juego ${title}`);
        logger.debug(`Excepcion al hacer inserción de juego ${title}`);

        let error = 'No se ha podido insertar juego';

        render(req, res, 'pages/addGamePage', {
            error,
            datos: {},
            errores: {}
        });
    }
}

export function viewModifyGameBD(req, res) {

    //let id = req.params.id;
    //const game = Game.getGameById(id);
    //const game = req.body.game;
    const gameId = req.params.id;

    const game = Game.getGameById(gameId);

    console.log("Juego a modificar", game);

    let contenido = 'pages/modifyGamePage';

    res.render('page', {
        contenido,
        session: req.session,
        game: game
    });
}


export function doModifyGameBD(req, res) {
    const title = req.body.title.trim();
    const gameId = req.params.id;
    const description = req.body.description.trim();
    const rating = Number(req.body.rating.trim());
    const favNumber = parseInt(req.body.favNumber.trim());
    const company_id = parseInt(req.body.company_id.trim());

    try {
        const new_info_game = new Game(title, description, rating, favNumber, "elden_ring.png", company_id, null);

        console.log("Nueva info de juego");
        console.log(new_info_game);

        const game2 = Game.update(gameId, new_info_game);
        console.log("Juego modificado bien", game2);

        return res.render('page', {
            contenido: 'pages/listajuegos',
            session: req.session,
            game: game2,
            exito: 'Juego modificado con exito en la Base de Datos'
        });

    } catch (e) {
        res.render('page', {
            contenido: 'pages/modifyGamePage',
            session: req.session,
            game: Game.getGameById(gameId),
            error: 'ERROR al modificar juego en la Base de Datos'
        })
    }
}

export function doDelete(req, res) {
    const name = req.params.id;

    try {
        Game.doDelete(id);
        return res.render('page', {
            contenido: 'pages/listajuegos'
        })
    } catch (e) {
        return res.render('page', {
            contenido: 'pages/listajuegos'
        })
    }

}
