import { Juego } from "./games/Game.js";

export function inicializaModelos(db) {
    Juego.initStatements(db);
}