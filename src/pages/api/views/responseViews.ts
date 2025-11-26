// Responses removed: API endpoints disabled.
export const unauthorizedResponse = () =>
    new Response("API removed", { status: 410 });

export const badRequestResponse = (message: string) =>
    new Response(JSON.stringify({ message }), { status: 410 });

export const successResponse = () =>
    new Response(JSON.stringify({ ok: false }), { status: 410 });

export const serverErrorResponse = (message: string) =>
    new Response(JSON.stringify({ message }), { status: 410 });

export const userFoundResponse = () =>
    new Response(JSON.stringify({ message: "User found" }), { status: 410 });
