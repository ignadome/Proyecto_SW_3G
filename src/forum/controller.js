import express from 'express';
import { Forum } from "./Forum.js";

const forumRouter = express.Router();


export function viewForum(req, res) {
    let contenido = 'pages/forum';
    const game_id = req.params.game_id;
    const threadList = Forum.getThreadsByGame(game_id);
    const session = req.session;

    console.log(threadList);
    res.render('page', {
        contenido,
        session: req.session,
        threadList: threadList,
        game_id: game_id
    });
}


export function showThreads(req, res) {
    console.log("AAAAAAAAAAAAAAAAAAA")
    let contenido = 'pages/loadThread';
    const game_id = req.params.game_id;
    const last_id = req.params.last_id;
    const cant = req.params.cant;
    const offset = req.params.offset;
    const threadList = Forum.getThreadById(game_id,last_id, cant, offset);

    console.log(threadList);
   

    res.render('p', {
        contenido,
        session: req.session,
        threadList: threadList,
        offset: (+offset) + (+cant),
        cant: cant,
        game_id: game_id,
        last_id: last_id
    });
}

export function viewCreateThread(req, res) {
    let contenido = 'pages/createThread';
    res.render('page', {
        contenido,
        session: req.session
    });
}

export function doCreateThread(req, res) {
    const game_id = req.body.game_id;
    const title = req.body.title.trim();
    const description = req.body.description.trim();
    const user_id = req.session.user_id;

    try {
        const threadId = Forum.createThread(game_id, title, description, user_id);
        return res.redirect(`/forum/thread/${threadId}`);
    } catch (e) {
        res.render('page', {
            contenido: 'pages/createThread',
            session: req.session,
            error: 'ERROR al crear el hilo en la Base de Datos'
        });
    }
}

export function doCreateReply(req, res) {
    const game_id = req.body.game_id;
    const original_post_id = req.body.original_post_id;
    const description = req.body.description.trim();
    const user_id = req.session.user_id;

    try {
        Forum.createReply(game_id, original_post_id, description, user_id);
        return res.redirect(`/forum/thread/${original_post_id}`);
    } catch (e) {
        res.render('page', {
            contenido: 'pages/forumThread',
            session: req.session,
            error: 'ERROR al responder en el foro'
        });
    }
}