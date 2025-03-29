import { error } from "./helpers.js";

export function render(req, res, contenido, params) {
    res.render('page', {
        contenido,
        session: req.session,
        helpers: {
            error
        },
        ...params
    });
}