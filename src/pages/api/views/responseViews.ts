export const unauthorizedResponse = () =>
    new Response("Unauthorized", { status: 401 });

export const badRequestResponse = (message: string) =>
    new Response(message, { status: 400 });

export const successResponse = () =>
    new Response("ok", { status: 200 });

export const serverErrorResponse = (message: string) =>
    new Response(message, { status: 500 });

export const userFoundResponse = () =>
    new Response("User found previously", { status: 302 });
