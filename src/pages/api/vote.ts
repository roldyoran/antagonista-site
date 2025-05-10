import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    // Log the received request data
    const data = await request.json();
    console.log('Datos recibidos en el servidor:', data);

    // Simular un pequeño retraso para ver el estado de carga
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock success response without database interaction
    return new Response(JSON.stringify({ 
        success: true, 
        message: "Votos registrados (modo prueba sin base de datos)" 
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};
