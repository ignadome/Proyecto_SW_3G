import express from 'express';

const informacionRouter = express.Router();

informacionRouter.get('/bocetos', (req, res) => {
    
    let contenido = 'paginas/bocetos';
    
    res.render('pagina', {
        contenido,  
        session: req.session
    });
});

informacionRouter.get('/contacto', (req, res) => {
    
    let contenido = 'paginas/contacto';
    
    res.render('pagina', {
        contenido,  
        session: req.session
    });
});

informacionRouter.get('/detalles', (req, res) => {
    
    let contenido = 'paginas/detalles';
    
    res.render('pagina', {
        contenido,  
        session: req.session
    });
});

informacionRouter.get('/miembros', (req, res) => {
    
    let contenido = 'paginas/miembros';
    
    res.render('pagina', {
        contenido,  
        session: req.session
    });
});

informacionRouter.get('/planificacion', (req, res) => {
    
    let contenido = 'paginas/planificacion';
    
    res.render('pagina', {
        contenido,  
        session: req.session
    });
});

export default informacionRouter;