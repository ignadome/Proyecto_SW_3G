export function viewContenidoNormal(req, res) {
    let contenido = 'paginas/noPermisos';//Inicializa a pagina sin permisos
    if (req.session != null && req.session.nombre != null) {//Si tiene la sesion activa y un nombre en la sesion, muestra la pagina normal
        contenido = 'paginas/normal';
    }
    res.render('pagina', {
        contenido,
        session: req.session//Renderizado de la pagina con la info de la sesion actual
    });
}

export function viewContenidoAdmin(req, res) {
    let contenido = 'paginas/noPermisos';
        contenido = 'paginas/admin';
    res.render('pagina', {
        contenido,
        session: req.session
    });
}

export function viewContenidoJournal(req, res) {
    let contenido = 'paginas/noPermisos';
        contenido = 'paginas/journal';
    res.render('pagina', {
        contenido,
        session: req.session
    });
}