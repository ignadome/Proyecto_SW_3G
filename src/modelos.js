import { Juego } from "./juegos/Juego.js";
import { User } from "./users/User.js";

export function inicializaModelos(db) {
    Juego.initStatements(db);
    User.initStatements(db);
}