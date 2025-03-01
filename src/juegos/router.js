import express from 'express';

const juegosRouter = express.Router();

juegosRouter.get('/listajuegos', (req, res) => {
    
    let contenido = 'paginas/listajuegos';
    
    res.render('pagina', {
        contenido,  
        session: req.session
    });
});

export default juegosRouter;