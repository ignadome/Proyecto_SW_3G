import {Game} from "./games/Game.js";
import {User} from "./users/User.js";
import {Review} from "./reviews/Review.js";

export function inicializaModelos(db) {
    Game.initStatements(db);
    User.initStatements(db);
    Review.initStatements(db);
}
