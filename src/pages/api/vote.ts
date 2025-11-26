// API removed: this endpoint is no longer used.
export const POST = async () => {
    return new Response(JSON.stringify({
        success: false,
        message: "API removed"
    }), { status: 410, headers: { "Content-Type": "application/json" } });
};
