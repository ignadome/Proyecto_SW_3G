import express from 'express';
import {Genre} from "./Genre.js";
export function getGameGenres(req,res){
    let contenido = 'pages/genreList'

    let id = req.params.id;

    const genreList = Genre.getGameGenres(id);

    res.render('page',{
        contenido,
        session: req.session,
        genreList: genreList
    })
}

export function showGenreInfo(req, res){

    let contenido = 'pages/genre';

    let id = req.params.id;
    const genre = Genre.getGenreById(id);

    res.render('page', {
        contenido,
        session: req.session,
        genre: genre
    });
}
export function deleteGenre(req,res){
    let id = req.params.id;
    Genre.deleteGenre(id);
    location.reload();
}

export function viewModifyGenreBD(req, res){

    const gameId = req.params.id;
    
    const game = Game.getGameById(gameId);
    const genreList = Genre.getGameGenres(game);
    let contenido = 'pages/modifyGenresPage';

    res.render('page', {
        contenido,
        session: req.session,
        genreList: genres,
        game: game
    });
}
export function viewAddGenreBD(req, res){

    let contenido = 'pages/addGenrePage';

    res.render('page', {
        contenido,
        session: req.session
    });
}
export function doAddGenreBD(req, res){

    const name = req.body.name.trim();
    try {
        const genre = new Genre(null,name);

        console.log("GENRE INFO");
        console.log(genre);

        const result =  Genre.insert(genre)
        console.log(result);

        return res.render('page', {
            contenido: 'pages/addGenrePage',
            session: req.session,
            exito: 'Genre correctly inserted'
        });

    } catch (e) {
        res.render('page', {
            contenido: 'pages/addGenrePage',
            error: 'A problem occurred adding the game onto the DB'
        })
    }
}