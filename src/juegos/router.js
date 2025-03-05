import express from 'express';
import {Juego} from "./Juego.js";

const juegosRouter = express.Router();

juegosRouter.get('/listajuegos', (req, res) => {
    
    let contenido = 'paginas/listajuegos';
    
    res.render('pagina', {
        contenido,  
        session: req.session
    });
});

juegosRouter.get('/game', (req, res) => {

    let contenido = 'paginas/juego';

//    const juego = Juego.getGameById(req.params.id);
    let game = {titulo: 'titulooo', descripcion: 'descripcaoo epica', valoracion: 3, numFavoritos : 5};
    Juego.#insert(game);

    const juego = Juego.getGameById(0);

    req.session.nombre_juego = juego.titulo;
    req.session.id = juego.id;
    req.session.descr = juego.descripcion;

    res.render('pagina', {
        contenido,
        session: req.session,
    });
});
