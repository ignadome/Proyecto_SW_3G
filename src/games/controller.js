import express from 'express';
import {Game} from "./Game.js";
import {Review} from "../reviews/Review.js";
import {Genre} from "../genres/Genre.js"

import { render } from '../utils/render.js';
import { validationResult, matchedData } from 'express-validator';
import {logger} from '../logger.js'; 
import { Forum } from '../forum/Forum.js';
const juegosRouter = express.Router();


export function showGameList(req, res) {
    /*
    let contenido = 'pages/listajuegos';

    const gameList = Game.getGameList();

    res.render('page', {
        contenido,
        session: req.session,
        gameList: gameList,
    });*/

    
    //const gameList = Game.getGameList();

    let page = 1;
    console.log("req.params.numPage: ", req.params.numPage);
    if (req.params.numPage ){
        page = parseInt(req.params.numPage, 10); 
    }

    console.log("Numero pag: ", page);

    // 3 para pruebas,  15 de normal
    let numGamesPerPage = 3;

    const gameList = Game.getSearchedGameList("", "id", "ASC", numGamesPerPage, (page - 1) *numGamesPerPage);

    render(req, res, 'pages/listajuegos', {
        errores: {},
        info: {},
        gameList: gameList,
        page,
        filtersValues: {}
});
}

export function showGameListSearched(req, res) {
    let page = 1;
    console.log("req.params.numPage: ", req.params.numPage);
    if (req.params.numPage ){
        page = parseInt(req.params.numPage, 10); 
    }

    console.log("Numero pag: ", page);

    // 3 para pruebas,  15 de normal
    let numGamesPerPage = 3;

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

    // 3 para pruebas,  15 de normal
    //const gameList = Game.getSearchedGameList(title, order, order_dir, 3, 0);
    const gameList = Game.getSearchedGameList(title, order, order_dir, numGamesPerPage, (page - 1) *numGamesPerPage);

    console.log("GAME LIST SEARCHED");
    console.log(gameList);
    /*
    res.render('page', {
        contenido,
        session: req.session,
        gameList: gameList
    });*/
    render(req, res, 'pages/listajuegos', {
        errores: {},
        info: {},
        gameList: gameList,
        page,
        filtersValues: {
            title: title,
            order_option: order_option,
            asc_desc_option: asc_desc_option
        }
    })
    
}

export function showGameInfo(req, res) {

    let contenido = 'pages/game';

    let id = req.params.id;
    const game = Game.getGameById(id);
    const reviewListByGameId = Review.getAllReviewsByGameId(id);
    const genres = Genre.getGameGenres(game);
    const threadList = Forum.getThreadsByGame(id);
    res.render('page', {
        contenido,
        session: req.session,
        game: game,
        reviewList: reviewListByGameId,
        genreList: genres,
        threadList: threadList
    });
}

export function viewAddGameBD(req, res) {

    let contenido = 'pages/addGamePage';

    render(req, res, contenido, {
        errores: {},
        info: {}
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
    const url_image =  req.body.url_image.trim();

    try {
        const game = new Game(title, description, rating, favNumber, url_image, company_id, null);

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
        /*
        let info = {
            title: title,
            description: description,
            rating: rating,
            favNumber: favNumber,
            url_image: url_image, 
            company_id: company_id,
        };*/
        render(req, res, contenido, {
            errores: {},
            exito: 'Juego insertado con exito en la Base de Datos',
            info:{
                title: title,
                description: description,
                rating: rating,
                favNumber: favNumber,
                url_image: url_image, 
                company_id: company_id,
            }
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
            errores: {},
            info:{
                title: title,
                description: description,
                rating: rating,
                favNumber: favNumber,
                url_image: url_image, 
                company_id: company_id,
            }
        });
    }
}

export function viewModifyGameBD(req, res) {

    const gameId = req.params.id;
    const game = Game.getGameById(gameId);

    let contenido = 'pages/modifyGamePage';

    render(req, res, contenido, {
        errores: {},
        info: {},
        game: game
    });
    /*
    res.render('page', {
        contenido,
        session: req.session,
        game: game
    });*/
}


export function doModifyGameBD(req, res) {

    const title = req.body.title.trim();
    const gameId = req.params.id;
    const description = req.body.description.trim();
    const rating = Number(req.body.rating.trim());
    const favNumber = parseInt(req.body.favNumber.trim());
    const company_id = parseInt(req.body.company_id.trim());
    const url_image = req.body.url_image.trim();

    const result = validationResult(req);
    if (! result.isEmpty()) {
        const errores = result.mapped();
        const datos = matchedData(req);
        return render(req, res, 'pages/modifyGamePage', {
            datos,
            errores,
            game: {
                id: gameId,
                title : title,
                description: description, 
                rating: rating, 
                favNumber: favNumber, 
                image: url_image, 
                company: company_id
            }
        });
    }

    try {
        const new_info_game = new Game(title, description, rating, favNumber, url_image, company_id, null);

        const game2 = Game.update(gameId, new_info_game);

        /*
        return res.render('page', {
            contenido: 'pages/game',
            session: req.session,
            errores: {},
            game: game2,
            exito: 'Juego modificado con exito en la Base de Datos'
        });*/
        const reviewListByGameId = Review.getAllReviewsByGameId(id);
        const genres = Genre.getGameGenres(game);
 
        render(req, res, 'pages/game', {
            errores: {},
            exito: 'Juego modificado con exito en la Base de Datos',
            game: game2,
            reviewList: reviewListByGameId,
            genreList: genres
        });
    } catch (e) {
        /*
        res.render('page', {
            contenido: 'pages/modifyGamePage',
            session: req.session,
            errores: {},
            game: Game.getGameById(gameId),
            error: 'ERROR al modificar juego en la Base de Datos'
        })*/
       
            /*
        render(req, res, 'pages/modifyGamePage', {
            errores: {},
            error: 'ERROR al modificar juego en la Base de Dato',
            info:{
                title: title,
                description: description,
                rating: rating,
                favNumber: favNumber,
                url_image: url_image, 
                company_id: company_id,
            }
        });*/
        const reviewListByGameId = Review.getAllReviewsByGameId(id);
        const genres = Genre.getGameGenres(game);
        render(req, res, 'pages/game', {
            errores: {},
            error: 'ERROR al modificar juego en la Base de Datos',
            game:{
                id: gameId,
                title: title,
                description: description,
                rating: rating,
                favNumber: favNumber,
                url_image: url_image, 
                company_id: company_id,
            },
            reviewList: reviewListByGameId,
            genreList: genres
        });
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
