import { createHash } from "crypto";
import { object, array, number } from "valibot";
import { characters } from "@data/characters";
import { getUser, addUserWithVotes } from "@db/client";
import { type TypeVotes } from "@data/votesinterface";

export const VoteSchema = object({
    votes: array(
        object({
            id: number(),
            rank: number(),
        })
    ),
});

export const generateID = (str: string): string => {
    return createHash("sha256").update(str).digest("hex");
};

export const validateVotes = (votes: any): boolean => {
    if (votes.length !== 3) return false;

    for (const vote of votes) {
        const character = characters.find((c) => c.id === vote.id);
        if (!character) return false;
    }

    return true;
};

export const saveVotesToDB = async (userId: string, votes: TypeVotes, voteDate: string) => {
    const userIdHash = generateID(userId);
    
    // We'll use localStorage to check if user has voted
    try {
        const hasVoted = await getUser(userIdHash);
        if (hasVoted) {
            throw new Error("USER_FOUND_PREVIOUSLY");
        }
    } catch (error) {
        if (error.message === "User not Found") {
            // This is good, means user hasn't voted
        } else {
            throw error;
        }
    }

    try {
        await addUserWithVotes(userIdHash, votes, voteDate);
    } catch (error) {
        throw new Error("DB_ERROR_SAVING_VOTES");
    }
};
