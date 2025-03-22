import express from 'express';
import { Forum } from "./Forum.js";

const forumRouter = express.Router();

export function showThreads(req, res) {
    let contenido = 'pages/forumThreads';
    const game_id = req.params.game_id;
    
    console.log("DEBUG ::: CONTENIDO", contenido);

    const threadList = Forum.getThreadsByGame(game_id);

    console.log("THREAD LIST");
    console.log(threadList);

    res.render('page', {
        contenido,
        session: req.session,
        threadList: threadList
    });
}

export function showThread(req, res) {
    let contenido = 'pages/forumThread';
    const thread_id = req.params.id;

    const thread = Forum.getThreadById(thread_id);
    const replies = Forum.getReplies(thread_id);

    console.log("THREAD INFO");
    console.log(thread);
    console.log("REPLIES");
    console.log(replies);

    res.render('page', {
        contenido,
        session: req.session,
        thread: thread,
        replies: replies
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
