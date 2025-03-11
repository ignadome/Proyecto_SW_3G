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

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use('/', express.static(config.recursos));
app.get('/', (req, res) => {
    const params = {
        contenido: 'pages/index', 
        session: req.session
    }
    res.render('page', params);
})
<<<<<<< HEAD
app.use('/games', juegosRouter);
app.use('/information', informacionRouter);

/*
function showGame(req, res) {
    const url = new URL(`http://servidor:3000${req.url}`);
    const paramsusuarios = url.searchParams;

    const num = (params.get("game")) || 0;
=======
app.use('/juegos', juegosRouter);
app.use('/informacion', informacionRouter);
app.use('/users',usersRouter);
>>>>>>> main


    return Juego.getGameByTitle(url, params.get("game"));
}
*/

