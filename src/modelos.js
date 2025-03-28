import {Game} from "./games/Game.js";
import {User} from "./users/User.js";
import {Review} from "./reviews/Review.js";
import {Genre} from "./genres/Genre.js";

export function inicializaModelos(db) {
    Game.initStatements(db);
    User.initStatements(db);
    Genre.initStatements(db);
    Review.initStatements(db);
}
