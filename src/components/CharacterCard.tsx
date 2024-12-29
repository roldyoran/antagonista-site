import React from 'react';
import { motion } from 'motion/react';

interface Props {
    id: number;
    name: string;
    image: string;
    isSelected: boolean;
    rank?: number;
    onVote: () => void;
    delay: number;
}

const CharacterCard: React.FC<Props> = ({ id, name, image, isSelected, rank, onVote, delay }) => {
    return (
        <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.2, ease: 'easeInOut' }}
            viewport={{ once: true }}


            className={`overflow-hidden opacity-0 border border-gray-300 text-center rounded-lg shadow-md transition-all duration-300 hover:shadow-xl  ${isSelected
                ? 'bg-primary text-white shadow-md shadow-primary dark:shadow-xl dark:shadow-purple-800 dark:border-none dark:bg-purple-800'
                : 'bg-white border-gray-100 dark:bg-neutral-900 dark:border-zinc-700 dark:text-white'
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
                    // loading="lazy"
                    className={`w-full h-48 object-cover ${isSelected ? '' : 'grayscale'}`}
                // className='w-full h-48 object-cover grayscale'
                />
                <div className="p-4">
                    <span className="font-semibold text-lg">{name}</span>
                    {isSelected && rank && (
                        <span className="absolute top-2 left-2 bg-primary text-white font-bold py-1 px-2 rounded-full md:px-3 md:py-2">
                            #{rank}
                        </span>
                    )}
                    <button type='button' className={`transition-all font-bold  mt-2 py-1.5 w-full border-2 rounded-md active:scale-90 uppercase text-sm ${isSelected ? 'bg-white text-primary hover:bg-white hover:text-primary' : 'text-primary border-primary hover:bg-primary/80 hover:text-white dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-400 dark:hover:text-white'
                        }   `}>
                        {
                            isSelected ? 'Votado' : 'Votar'
                        }
                    </button>
                </div>
            </div>
        </motion.li>
    );
};

export default CharacterCard;
