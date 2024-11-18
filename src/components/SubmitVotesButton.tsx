import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';


const RESULT_STATUS = {
    ERROR: -1,
    IDLE: 0,
    LOADING: 1,
    SUCCESS: 2,
    MSG: 3
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
    const [msgerror, setMsgerror] = useState('');

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

            if (response.status === 302) {
                setStatus(RESULT_STATUS.MSG);
                setMsgerror('Solo puedes votar una vez');
                return; // Evitar continuar si el usuario no existe
            }

            if (!response.ok) {
                setStatus(RESULT_STATUS.ERROR);
                return; // Evitar continuar si hay un error
            }

            // localStorage.setItem('VOLVERAVOTAR', 'false');
            // Al enviar los votos con éxito, setea VOLVERAVOTAR a false en localStorage
            setStatus(RESULT_STATUS.SUCCESS);
            confetti();
        } catch (error) {
            setStatus(RESULT_STATUS.ERROR);
        }
    };

    return (
        <div className="flex justify-center min-w-screen mt-16 mb-4">
            {statesession ? (
                <button
                    onClick={handleSubmit}
                    className={` text-xl uppercase md:text-3xl skew-x-[-20deg] font-bold px-9 py-3 border-2 transition-all motion-safe:hover:ease-out ${status === RESULT_STATUS.ERROR || status === RESULT_STATUS.MSG
                        ? 'bg-red-400/90 text-red-950 border-red-700 cursor-not-allowed'
                        : status === RESULT_STATUS.SUCCESS
                            ? 'bg-green-400 text-green-950 border-green-500 cursor-not-allowed'
                            : selectedCharacters.length === 3
                                ? 'hover:bg-primary bg-white/80 hover:text-white shadow-lg shadow-primary border-primary active:scale-100  hover:scale-105'
                                : 'cursor-not-allowed bg-secondary/70 border-secondary text-gray-50'
                        }`}
                    style={{
                        pointerEvents:
                            status === RESULT_STATUS.LOADING || status === RESULT_STATUS.ERROR || status === RESULT_STATUS.SUCCESS || status === RESULT_STATUS.MSG ? 'none' :
                                selectedCharacters.length === 3 ? 'auto' : 'none',
                    }}
                    disabled={status === RESULT_STATUS.LOADING || status === RESULT_STATUS.ERROR}
                >
                    {status === RESULT_STATUS.LOADING
                        ? 'Enviando...'
                        : status === RESULT_STATUS.SUCCESS
                            ? '¡Votos Enviados!'
                            : status === RESULT_STATUS.ERROR
                                ? 'Error al enviar los votos'
                                : status === RESULT_STATUS.MSG
                                    ? msgerror
                                    : `Enviar mis Votos ${selectedCharacters.length}/3`}
                </button>
            ) : (
                <p className="text-lg text-center text-wrap md:text-3xl skew-x-[-20deg] font-bold px-6 py-2 border-2 transition-all cursor-not-allowed bg-gray-200 text-gray-600">
                    ¡Inicia sesión para enviar tus votos!
                </p>
            )}
        </div>
    );
};

export default SubmitVotesButton;
