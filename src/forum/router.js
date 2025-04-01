import express from 'express';
import { showThreads, viewCreateThread, doCreateThread, doCreateReply } from "./controller.js";

const forumRouter = express.Router();

forumRouter.get('/loadThread/:game_id/:last_id/:cant/:offset', showThreads);
forumRouter.get('/createThread/:game_id', viewCreateThread);
forumRouter.post('/createThread/:game_id', doCreateThread);
forumRouter.post('/reply/:thread_id', doCreateReply);
export default forumRouter;