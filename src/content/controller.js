export function viewContenidoNormal(req, res) {
    let contenido = 'pages/noPermisos';//Inicializa a page sin permisos
    if (req.session != null && req.session.nombre != null) {//Si tiene la sesion activa y un nombre en la sesion, muestra la page normal
        contenido = 'pages/normal';
    }
    res.render('page', {
        contenido,
        session: req.session//Renderizado de la page con la info de la sesion actual
    });
}

export function viewContenidoAdmin(req, res) {
    let contenido = 'pages/noPermisos';
        contenido = 'pages/admin';
    res.render('page', {
        contenido,
        session: req.session
    });
}

export function viewContenidoJournal(req, res) {
    let contenido = 'pages/noPermisos';
        contenido = 'pages/journal';
    res.render('page', {
        contenido,
        session: req.session
    });
}