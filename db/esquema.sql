-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario TEXT PRIMARY KEY
);

-- Tabla de Personajes
CREATE TABLE IF NOT EXISTS Personajes (
    id_personaje INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL
);

-- Tabla de Votos
CREATE TABLE IF NOT EXISTS Votos (
    id_voto INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario TEXT NOT NULL,
    id_personaje INTEGER NOT NULL,
    posicion INTEGER NOT NULL CHECK(posicion IN (1, 2, 3)),
    -- Valor calculado automáticamente según la posición del voto
    valor INTEGER GENERATED ALWAYS AS (
        CASE 
            WHEN posicion = 1 THEN 3
            WHEN posicion = 2 THEN 2
            WHEN posicion = 3 THEN 1
            ELSE 0 
        END
    ) VIRTUAL,
    fecha TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_personaje) REFERENCES Personajes(id_personaje),
    UNIQUE(id_usuario, id_personaje)
);


-- Trigger anterior comentado
-- -- TRIGGER
-- CREATE TRIGGER IF NOT EXISTS limitar_votos_por_usuario
-- BEFORE INSERT ON Votos
-- FOR EACH ROW
-- WHEN (SELECT COUNT(*) FROM Votos WHERE id_usuario = NEW.id_usuario) >= 3
-- BEGIN
--     SELECT RAISE(FAIL, 'El usuario ya ha alcanzado el límite de 3 votos.');
-- END;


-- TRIGGER para limitar votos por usuario
CREATE TRIGGER IF NOT EXISTS limitar_votos_por_usuario
BEFORE INSERT ON Votos
FOR EACH ROW
WHEN 
    (SELECT COUNT(*) FROM Votos WHERE id_usuario = NEW.id_usuario) >= 3 OR
    EXISTS (
        SELECT 1 
        FROM Votos 
        WHERE id_usuario = NEW.id_usuario 
        AND posicion = NEW.posicion
    )
BEGIN
    SELECT RAISE(FAIL, 'El usuario ya ha alcanzado el límite de 3 votos o ya ha votado en esta posición.');
END;

