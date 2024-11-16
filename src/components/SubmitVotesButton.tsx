import React, { useState, useEffect } from 'react';

const RESULT_STATUS = {
    ERROR: -1,
    IDLE: 0,
    LOADING: 1,
    SUCCESS: 2,
    RETRY: 3
};

interface SelectedCharacter {
    id: number;
    rank: number;
}

interface SubmitVotesButtonProps {
    selectedCharacters: SelectedCharacter[];
    statesession: boolean;
}

const SubmitVotesButton: React.FC<SubmitVotesButtonProps> = ({ selectedCharacters, statesession }) => {
    const [status, setStatus] = useState(RESULT_STATUS.IDLE);

    // // Al cargar el componente, comprobamos si VOLVERAVOTAR está en localStorage
    // useEffect(() => {
    //     const volverAVotar = localStorage.getItem('VOLVERAVOTAR');
    //     if (volverAVotar === 'false') {
    //         setStatus(RESULT_STATUS.RETRY);
    //     }
    // }, []);

    const handleSubmit = async () => {
        setStatus(RESULT_STATUS.LOADING);
        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ votes: selectedCharacters }),
            });

            if (!response.ok) {
                setStatus(RESULT_STATUS.ERROR);
                return; // Evitar continuar si hay un error
            }

            // localStorage.setItem('VOLVERAVOTAR', 'false');
            // Al enviar los votos con éxito, setea VOLVERAVOTAR a false en localStorage
            setStatus(RESULT_STATUS.SUCCESS);
        } catch (error) {
            setStatus(RESULT_STATUS.ERROR);
        }
    };

    return (
        <div className="flex justify-center min-w-screen mt-8">
            {statesession ? (
                <button
                    onClick={handleSubmit}
                    className={`text-sm uppercase md:text-xl skew-x-[-20deg] font-bold px-6 py-2 border-2 transition-all duration-300 ${status === RESULT_STATUS.ERROR
                        ? 'bg-red-400 text-white border-red-700 cursor-not-allowed'
                        : status === RESULT_STATUS.SUCCESS
                            ? 'bg-green-400 text-green-900 border-green-400 cursor-not-allowed'
                            : status === RESULT_STATUS.RETRY
                                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                                : selectedCharacters.length === 3
                                    ? 'hover:bg-primary/80 hover:text-white text-primary border-primary active:scale-100  hover:scale-105'
                                    : 'cursor-not-allowed bg-gray-200 text-gray-600'
                        }`}
                    style={{
                        pointerEvents: status === RESULT_STATUS.RETRY ? 'none' : selectedCharacters.length === 3 ? 'auto' : 'none',
                    }}
                    disabled={status === RESULT_STATUS.LOADING || status === RESULT_STATUS.ERROR || status === RESULT_STATUS.RETRY} // Desactiva el botón también en RETRY
                >
                    {status === RESULT_STATUS.LOADING
                        ? 'Enviando...'
                        : status === RESULT_STATUS.SUCCESS
                            ? '¡Votos Enviados!'
                            : status === RESULT_STATUS.ERROR
                                ? 'Error al enviar los votos'
                                : status === RESULT_STATUS.RETRY
                                    ? 'No puedes votar nuevamente'
                                    : `Enviar mis Votos ${selectedCharacters.length}/3`}
                </button>
            ) : (
                <p className="text-sm md:text-xl skew-x-[-20deg] font-bold px-6 py-2 border-2 transition-all cursor-not-allowed bg-gray-200 text-gray-600">
                    ¡Inicia sesión para enviar tus votos!
                </p>
            )}
        </div>
    );
};

export default SubmitVotesButton;
