import express from 'express';

const juegosRouter = express.Router();

juegosRouter.get('/gameLists', (req, res) => {
    
    let contenido = 'pages/gameLists';
    
    res.render('page', {
        contenido,  
        session: req.session
    });
});

export default juegosRouter;