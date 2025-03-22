import { Game } from "./games/Game.js";
import { User}from "./users/User.js";
import { Forum } from "./forum/Forum.js";

export function inicializaModelos(db) {
    Game.initStatements(db);
    User.initStatements(db);
    Forum.initStatements(db);
}
