INSERT INTO company (name)
VALUES ('Nintendo'),
       ('Sony'),
       ('Microsoft'),
       ('CD Projekt Red'),
       ('Rockstar Games');

INSERT INTO game (title, description, rating, favNumber, image, company_id)
VALUES ('The Legend of Zelda: Breath of the Wild', 'Aventura en mundo abierto.', 9.8, 5000, '/img/games/botw.png', 1),
       ('God of War', 'Kratos y Atreus en una aventura épica.', 9.7, 4000, '/img/games/gow2018.png', 2),
       ('Halo Infinite', 'El Jefe Maestro regresa a la acción.', 8.5, 3500, '/img/games/halo_infinite.png', 3),
       ('The Witcher 3: Wild Hunt', 'Geralt en busca de Ciri.', 9.9, 6000, '/img/games/tw3.png', 4),
       ('Red Dead Redemption 2', 'La historia de Arthur Morgan en el Viejo Oeste.', 9.8, 7000, '/img/games/rdr2.png', 5),
       ('Super Mario Odyssey', 'La aventura de Mario junto a capi.', 9.8, 8000, 'https://m.media-amazon.com/images/I/71MQ0RSj1xL._AC_UF894,1000_QL80_.jpg', 1),
       ('Cyberpunk 2077', 'RPGS de mundo abierto en un futuro cyberpunk.', 9.2, 3000, 'https://image.api.playstation.com/vulcan/ap/rnd/202008/0416/6Bo40lnWU0BhgrOUm7Cb6by3.png', 4);

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


INSERT INTO forum_post (game_id, original_post_id, title, description, user_id)  
VALUES 
    (1, -1, 'Discusión sobre Elden Ring', 'Hablemos sobre estrategias y builds en Elden Ring.', 2),
    (1, -1, 'Discusión sobre Elden Ring2', 'Hablemos sobre estrategias y builds en Elden Ring o no.', 3),
    (1, -1, 'Discusión sobre Elden Ring3', 'Hablemos sobre estrategias y builds en Elden Ring o no.', 1),
    (1, 1, 'Re: Discusión sobre Elden Ring', 'Yo uso una build de fuerza con la Colossal Greatsword.', 3),
    (2, -1, 'Opiniones sobre Baldur’s Gate 3', '¿Qué os parece la historia y mecánicas del juego?', 1),
    (2, 5, 'Re: Opiniones sobre Baldur’s Gate 3', 'Me encanta la narrativa y la libertad de decisiones.', 3),
    (3, -1, '¿Qué os parece el nuevo Halo?', '¿Creéis que Infinite está a la altura de la saga?', 1),
    (4, -1, '¿Es The Witcher 3 el mejor RPG de la historia?', '¿O hay otros juegos que lo superan?', 2),
    (5, -1, '¿Qué opináis de Red Dead Redemption 2?', '¿Es el mejor juego de Rockstar?', 3),
    (5, 9, 'Re: ¿Qué opináis de Red Dead Redemption 2?', 'Es un juegazo, pero no supera a GTA V.', 1),
    (5, 10, 'Re: ¿Qué opináis de Red Dead Redemption 2?', 'A mí me gustó más que GTA V.', 2),
    (5, 11, 'Re: ¿Qué opináis de Red Dead Redemption 2?', 'Bully era muhco mejor, que pena que cancelaran Bully-2', 3);