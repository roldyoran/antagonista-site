import React, { useState, useEffect } from 'react';
import { characters } from '@data/characters';
import CharacterCard from '@components/CharacterCard';


interface SelectedCharacter {
    id: number;
    rank: number;
}

interface SessionActiveUser {
    statesession: boolean;
}

const CharactersPage: React.FC<SessionActiveUser> = ({ statesession }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCharacters, setSelectedCharacters] = useState<SelectedCharacter[]>([]);

    // Cargar los votos guardados desde localStorage cuando se monta el componente
    useEffect(() => {
        const storedVotes = localStorage.getItem('selectedCharacters');
        if (storedVotes) {
            setSelectedCharacters(JSON.parse(storedVotes));
        }
    }, []);

    // Guardar los votos en localStorage cuando selectedCharacters cambie
    useEffect(() => {
        if (selectedCharacters.length > 0) {
            localStorage.setItem('selectedCharacters', JSON.stringify(selectedCharacters));
        }
    }, [selectedCharacters]);

    const filteredCharacters = characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleVote = (id: number) => {
        const existingSelection = selectedCharacters.find((character) => character.id === id);

        if (existingSelection) {
            // Si ya está seleccionado, lo deseleccionamos y ajustamos los rangos de los demás
            setSelectedCharacters(
                selectedCharacters
                    .filter((character) => character.id !== id)
                    .map((character) => ({
                        ...character,
                        rank: character.rank > existingSelection.rank ? character.rank - 1 : character.rank
                    }))
            );
        } else if (selectedCharacters.length < 3) {
            // Si no está seleccionado y hay menos de 3, lo seleccionamos con su rank
            setSelectedCharacters([
                ...selectedCharacters,
                { id, rank: selectedCharacters.length + 1 }
            ]);
        }
    };

    return (
        <div className=''>
            <div className="flex justify-center min-w-screen">
                <div className="relative w-full max-w-4xl mb-2">
                    <input
                        id="search"
                        type="text"
                        placeholder="Buscar personaje..."
                        className="md:skew-x-[-20deg] py-2 px-10 border-2 border-primary rounded-sm w-full  mb-10 focus:ring-2 focus:ring-primary focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#696969"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-3 top-1/2 transform -translate-y-7 text-gray-400 w-5 h-5"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filteredCharacters.map((character) => {
                    const selection = selectedCharacters.find((c) => c.id === character.id);
                    return (
                        <CharacterCard
                            key={character.id}
                            id={character.id}
                            name={character.name}
                            image={character.image}
                            isSelected={!!selection}
                            rank={selection?.rank}
                            onVote={() => handleVote(character.id)}
                        />
                    );
                })}
            </div>

            <div className="flex justify-center min-w-screen mt-8">
                {
                    (statesession)
                        ? 
                        <a
                            href="/personajes"
                            className={`text-sm md:text-xl skew-x-[-20deg] font-bold px-6 py-2 border-2  transition-all hover:scale-105 ${(selectedCharacters.length === 3 && statesession)
                                    ? 'hover:bg-primary/80 hover:text-white text-primary border-primary active:scale-100'
                                    : 'cursor-not-allowed bg-gray-200 text-gray-600'
                                }`}
                            style={{
                                pointerEvents: (selectedCharacters.length === 3 && statesession) ? 'auto' : 'none'
                            }}
                        >
                            Enviar mis Votos {selectedCharacters.length}/3
                        </a>
                        :
                        <a className='text-sm md:text-xl skew-x-[-20deg] font-bold px-6 py-2 border-2  transition-all cursor-not-allowed bg-gray-200 text-gray-600'>
                            ¡Inicia sesión para enviar tus votos!  
                        </a>

                }
            </div>
        </div>
    );
};

export default CharactersPage;
