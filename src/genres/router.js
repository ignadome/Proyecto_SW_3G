import express from 'express';
import {Genre} from './Genre.js';
import { doAddGenreBD, viewAddGenreBD, showGenreInfo, deleteGenre, viewModifyGenreBD} from './controller';

const genreRouter = express.Router();

genreRouter.get('/genreList', showGenreInfo);
genreRouter.get('/addGenre',viewAddGenreBD);
genreRouter.post('/addGenre', doAddGenreBD);
genreRouter.get('/modifyGenre/:gameId', viewModifyGenreBD);
genreRouter.post('/modifyGenre/:gameId', doModifyGenreBD);
genreRouter.post('/deleteGenre',deleteGenre)