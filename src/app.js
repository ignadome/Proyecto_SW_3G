import express from 'express';
import session from 'express-session';
import { config } from './config.js';
import juegosRouter from './games/router.js';
import informacionRouter from './information/router.js';
import usersRouter from './users/router.js';


import {Game} from "./games/Game.js";

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
        session: req.session,
        gameList: Game.getGameListLimited(5, 0)
    }
    res.render('page', params);
})
app.use('/games', juegosRouter);
app.use('/information', informacionRouter);
app.use('/users',usersRouter);
