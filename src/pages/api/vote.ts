import { createHash } from "crypto";
import { object, string, safeParse, array, number } from "valibot";
import { type APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { characters } from "@data/characters";
import { addUserVotes, addUser, getUser } from "src/db/client";


const VoteSchema = object({
    votes: array(
        object({
            id: number(),
            rank: number(),
        })
    ),
});


const generateID = (str: string) => {
    return createHash("sha256").update(str).digest("hex");
}


export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const email = session.user.email;
    if (!email) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { success, output } = safeParse(VoteSchema, await request.json());
    if (!success) {
        return new Response("Bad Request", { status: 400 });
    }

    const votesToSave = output.votes;

    if (votesToSave.length !== 3) {
        return new Response("Bad Request, Votes length must be 3", { status: 400 });
    }
    
    for (const vote of votesToSave) {
        const character = characters.find((c) => c.id === vote.id);
        if (!character) {
            return new Response("Bad Request, Id not found", { status: 400 });
        }
    }


    // console.log(votesToSave);
    const userId_hash = generateID(userId.toString());
    // console.log(userId);
    // console.log(userId_hash);
    // fecha en formato dd/mm/aaaa hh:mm:ss
    const voteDate = new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    // ('juanperez_1a2b3c4d', 101, 1, "15/11/2024"),
    // const allVotes = votesToSave.map((vote) => `('${userId}', ${vote.id}, ${vote.rank}, '${voteDate}')`);

    // console.log(allVotes);



    // LLAMAR A LA BASE DE DATOS
    try {
        await getUser(userId_hash);
    } catch (error) {
        // console.error(error);
        return new Response("User not Found", { status: 302 });
    }

    try {
        await addUser(userId_hash);
        await addUserVotes(userId_hash, votesToSave, voteDate);
    } catch (error) {
        // console.error(error);
        return new Response("Error al guardar las votaciones", { status: 500 });
    }



    return new Response("ok", { status: 200 });
};