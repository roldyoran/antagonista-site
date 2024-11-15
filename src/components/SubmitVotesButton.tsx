import React from 'react';

interface SubmitVotesButtonProps {
    selectedCount: number;
}

const SubmitVotesButton: React.FC<SubmitVotesButtonProps> = ({ selectedCount }) => {
    return (
        <div className="flex justify-center min-w-screen mt-8">
            <a
                href="/personajes"
                className={`text-sm md:text-xl md:skew-x-[-20deg] font-bold px-6 py-2 border-2 transition-all hover:scale-105 ${
                    selectedCount === 3
                        ? 'hover:bg-primary/80 hover:text-white text-primary border-primary active:scale-100'
                        : 'cursor-not-allowed bg-gray-200 text-gray-400'
                }`}
                style={{
                    pointerEvents: selectedCount === 3 ? 'auto' : 'none'
                }}
            >
                Enviar mis Votos {selectedCount}/3
            </a>
        </div>
    );
};

export default SubmitVotesButton;
