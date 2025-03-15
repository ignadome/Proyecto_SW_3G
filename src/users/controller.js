import {body} from 'express-validator';
import {RolesEnum, User} from './User.js';


export function viewLogin(req, res) {
    let contenido = 'views/login';//Carga la pagina
    if (req.session != null && req.session.login) {//Si ha iniciado sesio, muestra home
        contenido = 'views/homeUser'
    }
    res.render('page', {
        contenido,
        session: req.session
    });
}

export function viewRegister(req, res) { //No se que hacer aqui :b
    let contenido = 'paginas/register';//Carga la pagina
    if (req.session != null && req.session.login) {//Si ha iniciado sesio, muestra home
        contenido = 'paginas/homeUser'
    }
    res.render('pagina', {
        contenido,
        session: req.session
    });
}

export function doRegister(req, res) {
    body('username').escape();
    body('password').escape();

    // Capturo las variables username y password
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    try {
        const usuario = User.register(username, password);
        req.session.login = true;
        req.session.nombre = usuario.nombre;
        req.session.esAdmin = usuario.rol === RolesEnum.ADMIN;

        return res.render('pagina', {
            contenido: 'paginas/home',
            session: req.session
        });

    } catch (e) {
        res.render('pagina', {
            contenido: 'paginas/register',
            error: 'No se pudo registrar el usuario'
        })
    }
}

export function doLogin(req, res) {
    body('username').escape();
    body('password').escape();
    // Capturo las variables username y password
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    try {
        const usuario = User.login(username, password);
        req.session.login = true;
        req.session.nombre = usuario.nombre;
        req.session.esAdmin = usuario.rol === RolesEnum.ADMIN;

        return res.render('page', {
            contenido: 'views/home',
            session: req.session
        });

    } catch (e) {
        console.log(e);
        res.render('page', {
            contenido: 'views/login',
            error: 'El usuario o contraseña no son válidos'
        })
    }
}

export function doLogout(req, res, next) {
    // https://expressjs.com/en/resources/middleware/session.html
    // logout logic

    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.login = null
    req.session.nombre = null;
    req.session.esAdmin = null;
    req.session.save((err) => {
        if (err) next(err);

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate((err) => {
            if (err) next(err)
            res.redirect('/');
        })
    })
}
