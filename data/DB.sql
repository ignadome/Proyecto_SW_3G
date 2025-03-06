
DROP TABLE IF EXISTS game_genre;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS company;
--Para pruebas


-- Crear tabla de empresas (con AUTOINCREMENT para el id)
CREATE TABLE company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

-- Crear tabla de juegos (con AUTOINCREMENT para el id)
CREATE TABLE game (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    rating REAL CHECK (rating BETWEEN 0 AND 10),
    favNumber INTEGER DEFAULT 0 CHECK (favNumber >= 0),
    image TEXT, -- Columna para las imágenes (puedes almacenar varias rutas separadas por comas)
    company_id INTEGER NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

-- Crear tabla de géneros
CREATE TABLE genre (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

-- Crear tabla de relación entre juegos y géneros
CREATE TABLE game_genre (
    game_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES game(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
);


INSERT INTO company (name) VALUES ('Nintendo');
INSERT INTO company (name) VALUES ('Sony');
INSERT INTO company (name) VALUES ('Microsoft');

INSERT INTO game (title, rating, favNumber, description, image, company_id) 
VALUES 
('The Legend of Zelda: Breath of the Wild', 9.7, 15000, 'Un game de aventura en un mundo abierto, donde el jugador controla a Link para salvar el reino de Hyrule.', NULL, 1),
('God of War Ragnarok', 9.8, 18000, 'La continuación de la saga God of War, centrada en las aventuras de Kratos y su hijo Atreus enfrentando a los dioses nórdicos.', NULL, 2),
('Halo Infinite', 8.5, 12000, 'Un game de disparos en primera persona que continúa la historia del Jefe Maestro en su lucha contra los Covenant y las fuerzas enemigas.', NULL, 3);

INSERT INTO genre (name) VALUES ('Aventura');
INSERT INTO genre (name) VALUES ('Acción');
INSERT INTO genre (name) VALUES ('Shooter');

-- Zelda es Aventura y Acción
INSERT INTO game_genre (game_id, genre_id) VALUES (1, 1);
INSERT INTO game_genre (game_id, genre_id) VALUES (1, 2);

-- God of War es Acción
INSERT INTO game_genre (game_id, genre_id) VALUES (2, 2);

-- Halo es Shooter y Acción
INSERT INTO game_genre (game_id, genre_id) VALUES (3, 3);
INSERT INTO game_genre (game_id, genre_id) VALUES (3, 2);

