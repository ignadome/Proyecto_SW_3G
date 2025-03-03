DROP TABLE IF EXISTS imagen;
DROP TABLE IF EXISTS juego_genero;
DROP TABLE IF EXISTS genero;
DROP TABLE IF EXISTS juego;
DROP TABLE IF EXISTS empresa;
--Para pruebas


-- Crear tabla de empresas (con AUTOINCREMENT para el id)
CREATE TABLE empresa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT UNIQUE NOT NULL
);

-- Crear tabla de juegos (con AUTOINCREMENT para el id)
CREATE TABLE juego (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    valoracion REAL CHECK (valoracion BETWEEN 0 AND 10),
    num_favoritos INTEGER DEFAULT 0 CHECK (num_favoritos >= 0),
    descripcion TEXT,
    imagenes TEXT, -- Columna para las imágenes (puedes almacenar varias rutas separadas por comas)
    empresa_id INTEGER NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES empresa(id) ON DELETE CASCADE
);

-- Crear tabla de géneros
CREATE TABLE genero (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT UNIQUE NOT NULL
);

-- Crear tabla de relación entre juegos y géneros
CREATE TABLE juego_genero (
    juego_id INTEGER,
    genero_id INTEGER,
    PRIMARY KEY (juego_id, genero_id),
    FOREIGN KEY (juego_id) REFERENCES juego(id) ON DELETE CASCADE,
    FOREIGN KEY (genero_id) REFERENCES genero(id) ON DELETE CASCADE
);


INSERT INTO empresa (nombre) VALUES ('Nintendo');
INSERT INTO empresa (nombre) VALUES ('Sony');
INSERT INTO empresa (nombre) VALUES ('Microsoft');

INSERT INTO juego (titulo, valoracion, num_favoritos, descripcion, imagenes, empresa_id) 
VALUES 
('The Legend of Zelda: Breath of the Wild', 9.7, 15000, 'Un juego de aventura en un mundo abierto, donde el jugador controla a Link para salvar el reino de Hyrule.', NULL, 1),
('God of War Ragnarok', 9.8, 18000, 'La continuación de la saga God of War, centrada en las aventuras de Kratos y su hijo Atreus enfrentando a los dioses nórdicos.', NULL, 2),
('Halo Infinite', 8.5, 12000, 'Un juego de disparos en primera persona que continúa la historia del Jefe Maestro en su lucha contra los Covenant y las fuerzas enemigas.', NULL, 3);

INSERT INTO genero (nombre) VALUES ('Aventura');
INSERT INTO genero (nombre) VALUES ('Acción');
INSERT INTO genero (nombre) VALUES ('Shooter');

-- Zelda es Aventura y Acción
INSERT INTO juego_genero (juego_id, genero_id) VALUES (1, 1);
INSERT INTO juego_genero (juego_id, genero_id) VALUES (1, 2);

-- God of War es Acción
INSERT INTO juego_genero (juego_id, genero_id) VALUES (2, 2);

-- Halo es Shooter y Acción
INSERT INTO juego_genero (juego_id, genero_id) VALUES (3, 3);
INSERT INTO juego_genero (juego_id, genero_id) VALUES (3, 2);

