import { Game } from "./games/Game.js";
import { User}from "./users/User.js";

export function inicializaModelos(db) {
    Game.initStatements(db);
    User.initStatements(db);
}
