import express from 'express';
import { showThreads, showThread, viewCreateThread, doCreateThread, doCreateReply } from "./controller.js";

const forumRouter = express.Router();

forumRouter.get('/game/:game_id', showThreads);
forumRouter.get('/thread/:id', showThread);
forumRouter.get('/createThread', viewCreateThread);
forumRouter.post('/createThread', doCreateThread);
forumRouter.post('/reply', doCreateReply);

export default forumRouter;