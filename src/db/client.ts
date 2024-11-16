import { type TypeVotes } from "@data/votesinterface";
import { createClient } from "@libsql/client";
import { ExpectedImage } from "node_modules/astro/dist/core/errors/errors-data";


const client = createClient({
    url: import.meta.env.DATABASE_URL ?? "",
    authToken: import.meta.env.DATABASE_TOKEN ?? ""
});


export const addUser = async (userId: string) => {
    // -- Inserta usuarios
    const sql = `INSERT OR IGNORE INTO Usuarios (id_usuario) VALUES (?)`;
    // convierte el sql y el id a un batch que pueda enviar a la base de datos
    
    const inserts = [{ sql, args: [userId] }];
    // console.log(inserts);

    try {
        const result = await client.batch(inserts, "write");

        return result;
    } catch (error) {
        // Manejo de errores
        console.error(error);
        throw error;
    }

}

export const addUserVotes = async (userId: string, votes: TypeVotes, date: string) => {

    const sql = `INSERT INTO Votos (id_usuario, id_personaje, posicion, fecha) VALUES (?, ?, ?, ?)`;
    // el argumento de cada unos de los votos es un array de objetos con id y rank
    const args = votes.map((vote) => [userId, vote.id, vote.rank, date]);

    // las insersiones por cada argumento con el formato: [ { sql: "INSERT INTO votes (id_usuario, id_personaje, rank, fecha) VALUES (?, ?, ?, ?)", args: [userId, vote.id, vote.rank, date] }]
    const inserts = args.map((arg) => ({ sql, args: arg }));
    // console.log(inserts);

    const result = await client.batch(inserts, "write");
    return result;
};





// BORRAR LOS VOTOS DE UN USUARIO PARA ACTUALIZARLOS CON LOS NUEVOS
// export const cleanUserVotes = async (userId: string) => {
//     await client.execute(
//         sql: `DELETE FROM votes WHERE id_usuario = ?`,
//         args: []
//     )
// };