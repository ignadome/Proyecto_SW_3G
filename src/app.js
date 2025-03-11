import express from 'express';
import session from 'express-session';
import { config } from './config.js';
import juegosRouter from './games/router.js';
import informacionRouter from './information/router.js';

//import { notFound, estatico } from "./controladores.mjs";

export const app = express();
app.set('view engine', 'ejs');
app.set('views', config.vistas);

app.use(express.urlencoded({ extended: false }));
app.use(session(config.session));

app.use('/', express.static(config.recursos));
app.get('/', (req, res) => {
    const params = {
        contenido: 'pages/index', 
        session: req.session
    }
    res.render('page', params);
})
app.use('/games', juegosRouter);
app.use('/information', informacionRouter);

/*
function showGame(req, res) {
    const url = new URL(`http://servidor:3000${req.url}`);
    const paramsusuarios = url.searchParams;

    const num = (params.get("game")) || 0;


    return Juego.getGameByTitle(url, params.get("game"));
}
*/

