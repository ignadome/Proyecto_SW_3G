import express from 'express';

const routerInformation = express.Router();

routerInformation.get('/sketches', (req, res) => {
    
    let contenido = 'pages/sketches';
    
    res.render('page', {
        contenido,  
        session: req.session
    });
});

routerInformation.get('/contact', (req, res) => {
    
    let contenido = 'pages/contact';
    
    res.render('page', {
        contenido,  
        session: req.session
    });
});

routerInformation.get('/details', (req, res) => {
    
    let contenido = 'pages/details';
    
    res.render('page', {
        contenido,  
        session: req.session
    });
});

routerInformation.get('/members', (req, res) => {
    
    let contenido = 'pages/members';
    
    res.render('page', {
        contenido,  
        session: req.session
    });
});

routerInformation.get('/planification', (req, res) => {
    
    let contenido = 'pages/planification';
    
    res.render('page', {
        contenido,  
        session: req.session
    });
});

export default routerInformation;