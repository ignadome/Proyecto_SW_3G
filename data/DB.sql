
DROP TABLE IF EXISTS game_genre;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS company;
DROP TABLE if EXISTS user;
DROP TABLE IF EXISTS user_game;
--Para pruebas


-- Crear tabla de empresas (con AUTOINCREMENT para el id)
CREATE TABLE company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

-- Crear tabla de juegos (con AUTOINCREMENT para el id)
CREATE TABLE game (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE  ,
    description TEXT,
    rating REAL CHECK (rating BETWEEN 0 AND 10),
    favNumber INTEGER DEFAULT 0 CHECK (favNumber >= 0),
    image TEXT, -- Columna para las imágenes (puedes almacenar varias rutas separadas por comas)
    company_id INTEGER NOT NULL,
    genre NOT_NULL,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

-- Crear tabla de géneros
CREATE TABLE genre (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE "game_genre" (
	"game_id"	INTEGER NOT NULL,
	"genre_id"	INTEGER NOT NULL,
	PRIMARY KEY("game_id","genre_id"),
	FOREIGN KEY("game_id") REFERENCES "game"("id"),
	FOREIGN KEY("genre_id") REFERENCES "genre"("id")
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    bio TEXT,
    password TEXT NOT NULL,
    profile_picture TEXT,
    user_type TEXT CHECK (user_type IN ('A', 'U', 'P')) NOT NULL
);

CREATE TABLE user_game (
    user_id INTEGER,
    game_id INTEGER,
    PRIMARY KEY (user_id, game_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES game(id) ON DELETE CASCADE
);

