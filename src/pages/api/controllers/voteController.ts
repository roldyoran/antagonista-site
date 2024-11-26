import { safeParse } from "valibot";
import { VoteSchema, saveVotesToDB, validateVotes } from "../models/voteModel";
import { unauthorizedResponse, badRequestResponse, successResponse, serverErrorResponse, userFoundResponse } from "../views/responseViews";

export const processVoteRequest = async (session: any, request: Request) => {

    if (!session) {
        return unauthorizedResponse();
    }

    if (!session?.user?.email || !session?.user?.id) {
        return unauthorizedResponse();
    }

    const { success, output } = safeParse(VoteSchema, await request.json());
    
    if (!success) {
        return badRequestResponse("Invalid request format.");
    }
    
    if (!validateVotes(output.votes)) {
        return badRequestResponse("Votes must contain valid characters and exactly 3 items.");
    }
    
    const voteDate = new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    
    const userId = session.user.id;

    try {
        await saveVotesToDB(userId, output.votes, voteDate);
        return successResponse();
    } catch (error) {
        if (error.message === "USER_FOUND_PREVIOUSLY") {
            return userFoundResponse();
        }
        if (error.message === "DB_ERROR_SAVING_VOTES") {
            return serverErrorResponse("Error while saving votes.");
        }
        return serverErrorResponse("An unexpected error occurred.");
    }
};
