INSERT INTO company (name)
VALUES ('Nintendo'),
       ('Sony'),
       ('Microsoft'),
       ('CD Projekt Red'),
       ('Rockstar Games');

INSERT INTO game (title, description, rating, favNumber, image, company_id)
VALUES ('The Legend of Zelda: Breath of the Wild', 'Aventura en mundo abierto.', 9.8, 5000, 'zelda.jpg', 1),
       ('God of War', 'Kratos y Atreus en una aventura épica.', 9.7, 4000, 'gow.jpg', 2),
       ('Halo Infinite', 'El Jefe Maestro regresa a la acción.', 8.5, 3500, 'halo.jpg', 3),
       ('The Witcher 3: Wild Hunt', 'Geralt en busca de Ciri.', 9.9, 6000, 'witcher.jpg', 4),
       ('Red Dead Redemption 2', 'La historia de Arthur Morgan en el Viejo Oeste.', 9.8, 7000, 'rdr2.jpg', 5);

INSERT INTO genre (name)
VALUES ('Action'),
       ('Adventure'),
       ('RPG'),
       ('Shooter'),
       ('Open World');

INSERT INTO game_genre (game_id, genre_id)
VALUES (1, 2), -- Zelda - Adventure
       (1, 5), -- Zelda - Open World
       (2, 1), -- God of War - Action
       (3, 4), -- Halo - Shooter
       (4, 3), -- Witcher - RPG
       (4, 5), -- Witcher - Open World
       (5, 1), -- RDR2 - Action
       (5, 5); -- RDR2 - Open World

INSERT INTO user (username, bio, password, profile_picture, user_type)
VALUES ('User', 'Gamer de aventuras y RPGs.', '$2b$10$JdCg8yL3rRkkr.hhx1rjqOe30F9lhBlqA1sjYJW6ymzYExvQFHyjy',
        'alice.jpg', 'U'),
       ('Admin', 'Administrador del sistema.', '$2b$10$Htah5iG9eKj8ItIItpzK6uvny3c5/QjdZaLwwmFy32RPrfVspNgYS',
        'charlie.jpg', 'A');

INSERT INTO user_game (user_id, game_id)
VALUES (1, 1), -- Alice tiene Zelda
       (1, 2), -- Alice tiene God of War
       (2, 3), -- Bob tiene Halo
       (2, 4), -- Bob tiene The Witcher 3
       (3, 5); -- Charlie tiene Red Dead Redemption 2

INSERT INTO review (game_id, user_id, date, rating, description)
VALUES (1, 1, '2025-03-20 08:20:07', 8, 'esta golden este juego'),
       (1, 2, '2025-04-20 08:20:07', 4, 'pochillo este'),
       (1, 3, '2025-05-20 08:20:07', 10, 'literalmente el goty del año'),
       (2, 1, '2025-03-21 08:20:07', 3, 'viva canarias');
