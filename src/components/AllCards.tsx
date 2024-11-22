import React, { useState, useEffect } from 'react';
import { characters } from '@data/characters';
import CharacterCard from '@components/CharacterCard';
import SubmitVotesButton from '@components/SubmitVotesButton';

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
    const [showOnlyVotes, setShowOnlyVotes] = useState(false); // Estado para el filtro de votos

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

    // Filtrar personajes basado en el término de búsqueda y el filtro de votos
    const filteredCharacters = characters.filter((character) => {
        const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isSelected = selectedCharacters.some((c) => c.id === character.id);
        return matchesSearch && (!showOnlyVotes || isSelected);
    });

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
        <>
            <div className="flex flex-wrap items-center justify-center min-w-screen pb-6 space-x-2">
                <div className="relative w-full max-w-4xl">
                    <input
                        id="search"
                        type="text"
                        placeholder="Buscar personaje..."
                        className="w-full py-2 px-10 border-2 border-primary rounded-sm mb-4 focus:ring-2 focus:ring-primary focus:outline-none md:skew-x-[-20deg] 
                        dark:bg-transparent dark:text-white dark:border-purple-600 dark:focus:shadow-lg dark:focus:shadow-purple-500"
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
                        className="absolute left-3 top-3 text-gray-400 w-5 h-5"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                </div>
                <button
                    onClick={() => setShowOnlyVotes(!showOnlyVotes)}
                    className={`md:transform md:-translate-y-2 font-bold px-4 py-2 border-2 rounded-sm uppercase transition-all md:skew-x-[-20deg] dark:relative ${showOnlyVotes
                        ? 'bg-secondary text-white hover:bg-secondary/80 hover:scale-105 active:scale-100  dark:text-white dark:bg-transparent dark:border-cyan-600 dark:hover:shadow-lg dark:hover:shadow-cyan-600'
                        : 'bg-white/70  hover:bg-primary hover:text-white border-primary hover:scale-105 active:scale-100  dark:text-white dark:bg-transparent dark:border-purple-600 dark:hover:shadow-lg dark:hover:shadow-purple-600'
                        }`}
                >
                    {showOnlyVotes ?

                        <>
                            <span
                                className="dark:absolute dark:inset-0 dark:bg-cyan-500 dark:blur-lg dark:opacity-30 dark:rounded-lg"
                            ></span>
                            <span className="dark:relative">Mostrar Todos</span>
                        </>
                        :
                        <>
                            <span
                                className="dark:absolute dark:inset-0 dark:bg-purple-500 dark:blur-lg dark:opacity-30 dark:rounded-lg"
                            ></span>
                            <span className="dark:relative">Mostrar mis votos</span>
                        </>
                    }
                </button>
            </div>



            <ul
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filteredCharacters.map((character, index) => {
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
                            delay={index * 0.02}
                        />
                    );
                })}
            </ul>

            <SubmitVotesButton
                selectedCharacters={selectedCharacters}
                statesession={statesession}
            />


        </ >
    );
};

export default CharactersPage;