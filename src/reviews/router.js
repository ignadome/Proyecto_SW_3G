import express from "express";
import {showGameReviews, showUserReviews} from "./controller.js";

const reviewRouter = express.Router();

reviewRouter.get('/:game_id', showGameReviews);
reviewRouter.get('/:user_id', showUserReviews);