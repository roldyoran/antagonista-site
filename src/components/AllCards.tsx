import React, { useState } from 'react';
import { characters } from '@data/characters';
import CharacterCard from '@components/CharacterCard';

interface SelectedCharacter {
    id: number;
    rank: number;
}

const CharactersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCharacters, setSelectedCharacters] = useState<SelectedCharacter[]>([]);

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
        <div>
            <input
                type="text"
                placeholder="Buscar personaje..."
                className="md:skew-x-[-20deg] mx-auto py-2 px-6 border-2 border-primary rounded-sm w-full max-w-full mb-10 focus:ring-2 focus:ring-primary focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

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
        </div>
    );
};

export default CharactersPage;
