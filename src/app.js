import express from 'express';
import session from 'express-session';
import { config } from './config.js';
import juegosRouter from './juegos/router.js';
import informacionRouter from './informacion/router.js';

//import { notFound, estatico } from "./controladores.mjs";

export const app = express();

app.set('view engine', 'ejs');
app.set('views', config.vistas);

app.use(express.urlencoded({ extended: false }));
app.use(session(config.session));

app.use('/', express.static(config.recursos));
app.get('/', (req, res) => {
    const params = {
        contenido: 'paginas/index', 
        session: req.session
    }
    res.render('pagina', params);
})
app.use('/juegos', juegosRouter);
app.use('/informacion', informacionRouter);


