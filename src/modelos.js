import { Juego } from "./juegos/Juego.js";

export function inicializaModelos(db) {
    Juego.initStatements(db);
}