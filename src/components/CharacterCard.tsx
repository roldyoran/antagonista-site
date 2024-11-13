import React from 'react';

interface Props {
    id: number;
    name: string;
    image: string;
    isSelected: boolean;
    rank?: number;
    onVote: () => void;
}

const CharacterCard: React.FC<Props> = ({ id, name, image, isSelected, rank, onVote }) => {
    return (
        <div
            className={`overflow-hidden border text-center rounded-lg shadow-md transition-all duration-300 hover:shadow-xl  ${isSelected ? 'bg-violet-100 shadow-md shadow-primary' : 'bg-white border-gray-100'
                }`}
            id={`CardCharacter${id}`}
            onClick={onVote}
        >
            <div className="p-0 relative">
                <img
                    src={image}
                    alt={name}
                    width={200}
                    height={200}
                    className={`w-full h-48 object-cover ${isSelected ? '' : 'grayscale'}`}
                />
                <div className="p-4">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    {isSelected && rank && (
                        <span className="absolute top-2 left-2 bg-primary text-white font-bold py-1 px-2 rounded-full">
                            #{rank}
                        </span>
                    )}
                    <button className={`transition-all font-bold text-primary mt-2 py-1.5 w-full border-2 border-primary hover:bg-primary/80 hover:text-white rounded-md active:scale-90 uppercase text-sm ${isSelected ? 'bg-primary text-white' : ''
                        }   `}>
                        {
                            isSelected ? 'Votado' : 'Votar'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
