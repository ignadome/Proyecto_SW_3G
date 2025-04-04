import express from 'express';
import {Genre} from "./Genre.js";
import {Game} from "../games/Game.js";

export function deleteGenre(req,res){
    let id = req.params.id;
    let genre = Genre.getGenreById(id);
    Genre.delete(genre);

    let game_id = req.params.gameId

    res.redirect('/games/'+ game_id);
}
export function showGameGenres(req,res){

    const gameId = req.params.gameId;
    const game = Game.getGameGenres(gameId);
    const genreList = Genre.getGameGenres(game);
    res.render(req,res,'pages/showGameGenres',{
        contenido,
        session: req.session,
        genreList: genreList
    }
    )
}
export function doModifyGenreBD(req,res){
//WIP
}

export function doAddGenreBD(req, res){
    const genre_name = req.body.genre_name;
    const game_id = req.params.gameId;
    let genre = new Genre(null,genre_name);
    let game = Game.getGameById(game_id);
    Genre.addGenreToGame(game,genre);
    res.redirect('/games/'+ game_id);
}