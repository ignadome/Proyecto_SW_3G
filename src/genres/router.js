import express from 'express';
import {Genre} from './Genre.js';
import { doAddGenreBD, viewAddGenreBD, showGenreInfo, deleteGenre, viewModifyGenreBD, doModifyGenreBD, showGameGenres} from './controller.js';

const genreRouter = express.Router();

genreRouter.get('/genreList', showGenreInfo);
genreRouter.get('/addGenre',viewAddGenreBD);
genreRouter.post('/addGenre', doAddGenreBD);
genreRouter.get('/showGenres/:gameId',showGameGenres);
genreRouter.post('/modifyGenre/:gameId', doModifyGenreBD);
genreRouter.get('/modifyGenre/:gameId', viewModifyGenreBD);
genreRouter.post('/deleteGenre',deleteGenre);


export default genreRouter;