import express from "express";
import review from "ejs/ejs.js";

const reviewRouter = express.Router();

reviewRouter.get('/reviews/userReviews', (req, res) => {

    let contenido = 'pages/reviews/userReviews';

    res.render('page', {
        contenido,
        session: req.session
    });
});
/*
reviewRouter.get('/:game_id', showGameReviews);
reviewRouter.get('/:user_id', showUserReviews);
*/


export default reviewRouter;