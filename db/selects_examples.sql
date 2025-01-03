-- Consultar los votos acumulados por cada personaje (con los puntos correspondientes)
SELECT p.nombre AS personaje, SUM(v.valor) AS total_puntos
FROM Personajes p
JOIN Votos v ON p.id_personaje = v.id_personaje
GROUP BY p.id_personaje
ORDER BY total_puntos DESC;


-- | personaje    | total_puntos |
-- |--------------|--------------|
-- | Tago         | 5            |
-- | Panzer       | 4            |
-- | Tania        | 4            |
-- | Leji         | 3            |
-- | DJ           | 2            |
