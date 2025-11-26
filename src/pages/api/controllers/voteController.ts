// Controller removed: vote processing moved/disabled.
export const processVoteRequest = async () => {
  return new Response(JSON.stringify({ success: false, message: "vote API removed" }), {
    status: 410,
    headers: { "Content-Type": "application/json" },
  });
};
