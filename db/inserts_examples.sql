-- Inserta usuarios
INSERT INTO Usuarios (id_usuario) VALUES
('juanperez_1a2b3c4d'),
('mariagonzalez_5f6g7h8i'),
('pedrolopez_9j0k1l2m');

-- Inserta personajes
INSERT INTO Personajes (id_personaje, nombre) VALUES
(101, 'Tania'),
(102, 'Tago'),
(103, 'Leji'),
(104, 'Panzer'),
(105, 'DJ');



-- Juan Pérez vota por 3 personajes
INSERT INTO Votos (id_usuario, id_personaje, posicion, fecha) VALUES
('juanperez_1a2b3c4d', 101, 1, "15/11/2024"),  -- Juan vota por el Personaje A en la posición 1
('juanperez_1a2b3c4d', 102, 2, "15/11/2024"),  -- Juan vota por el Personaje B en la posición 2
('juanperez_1a2b3c4d', 103, 3, "15/11/2024");  -- Juan vota por el Personaje C en la posición 3

-- María González vota por 3 personajes
INSERT INTO Votos (id_usuario, id_personaje, posicion, fecha) VALUES
('mariagonzalez_5f6g7h8i', 104, 1, "15/11/2024"),  -- María vota por el Personaje D en la posición 1
('mariagonzalez_5f6g7h8i', 105, 2, "15/11/2024"),  -- María vota por el Personaje E en la posición 2
('mariagonzalez_5f6g7h8i', 101, 3, "15/11/2024");  -- María vota por el Personaje A en la posición 3

-- Pedro López vota por 3 personajes
INSERT INTO Votos (id_usuario, id_personaje, posicion, fecha) VALUES
('pedrolopez_9j0k1l2m', 102, 1, "15/11/2024"),  -- Pedro vota por el Personaje B en la posición 1
('pedrolopez_9j0k1l2m', 103, 2, "15/11/2024"),  -- Pedro vota por el Personaje C en la posición 2
('pedrolopez_9j0k1l2m', 104, 3, "15/11/2024");  -- Pedro vota por el Personaje D en la posición 3


-- Intentar insertar un voto adicional para Juan Pérez (debe fallar por superar el límite de 3 votos)
INSERT INTO Votos (id_usuario, id_personaje, posicion) VALUES
('juanperez_1a2b3c4d', 105, 1);  -- Este voto no se debe insertar debido a que Juan ya votó 3 veces
