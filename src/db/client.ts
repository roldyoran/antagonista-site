import { type TypeVotes } from "@data/votesinterface";
import { createClient } from "@libsql/client";
import { ExpectedImage } from "node_modules/astro/dist/core/errors/errors-data";


const client = createClient({
    url: import.meta.env.DATABASE_URL ?? "",
    authToken: import.meta.env.DATABASE_TOKEN ?? ""
});


export const getUser = async (userId: string) => {
    const rs = await client.execute({
        sql: "SELECT COUNT(*) AS user_exists FROM Usuarios WHERE id_usuario = ?",
        args: [userId],
    });
    // console.log("user exists");
    // console.log(rs.rows[0].user_exists);
    if (rs.rows[0].user_exists === 1) {
        throw new Error("User not Found"); // Lanza error si el usuario no existe
    }
    return true;
}

export const addUserWithVotes = async (userId: string, votes: TypeVotes, date: string) => {
    // Prepara las instrucciones SQL para la transacción
    const sqlStatements = [
        {
            sql: "INSERT OR IGNORE INTO Usuarios (id_usuario) VALUES (?)",
            args: [userId],
        },
        ...votes.map((vote) => ({
            sql: "INSERT INTO Votos (id_usuario, id_personaje, posicion, fecha) VALUES (?, ?, ?, ?)",
            args: [userId, vote.id, vote.rank, date],
        })),
    ];

    try {
        // Ejecuta las consultas dentro de una transacción
        const result = await client.batch(sqlStatements, "write");
        return { success: true, message: "User and votes added successfully", result };
    } catch (error) {
        console.error("Transaction failed:", error);
        throw new Error("Failed to add user and votes");
    }
};
