// Vote model removed: database-backed voting has been disabled.
export const VoteSchema = null;
export const validateVotes = () => false;
export const saveVotesToDB = async () => {
  throw new Error("API removed");
};
