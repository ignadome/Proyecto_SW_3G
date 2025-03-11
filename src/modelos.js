import { Juego } from "./games/Game.js";

export function inicializaModelos(db) {
    Game.initStatements(db);
    User.initStatements(db);
}
