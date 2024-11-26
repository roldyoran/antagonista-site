import { type APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { processVoteRequest } from "../api/controllers/voteController";

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    return await processVoteRequest(session, request);
};
