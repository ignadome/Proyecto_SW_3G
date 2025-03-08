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

--Insert de usuarios modelo
INSERT INTO user (username, bio, password, profile_picture, user_type)
VALUES
('123','Hola123','Mozo de pueblo','contraseña123','a','normal')
-- Bob (Usuario Premium - P) tiene los juegos 3 (Halo) y 4 (The Witcher 3)
INSERT INTO user_game (user_id, game_id) VALUES (2, 3);
INSERT INTO user_game (user_id, game_id) VALUES (2, 4);

-- Charlie (Administrador - A) tiene los juegos 5 (Minecraft) y 6 (Cyberpunk 2077)
INSERT INTO user_game (user_id, game_id) VALUES (3, 5);
INSERT INTO user_game (user_id, game_id) VALUES (3, 6);
