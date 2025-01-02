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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.2, ease: 'easeInOut' }}
            viewport={{ once: true }}


            className={`overflow-hidden relative cursor-pointer opacity-0 border-2 border-neutral-300 dark:border-neutral-800 text-center rounded-lg hover:border-purple-950 dark:hover:border-purple-400 transition-all duration-300  ${isSelected
                ? 'bg-purple-700/60 border-opacity-40 text-white shadow-lg shadow-purple-600 dark:shadow-lg dark:shadow-purple-900'
                : 'bg-white border-neutral-100 dark:bg-neutral-900 dark:border-zinc-700 dark:text-white'
                }`}
            id={`CardCharacter${id}`}
            onClick={onVote}
        >
            <div>
                    {/* <span className="font-semibold text-lg">{name}</span> */}
                    {isSelected && rank && (
                        <span className="absolute top-2 left-2 bg-purple-950 border border-white/50 text-white font-bold py-1 px-2 rounded-full md:px-3 md:py-2">
                            #{rank}
                        </span>
                    )}
                    {/* <button type='button' className={`transition-all font-bold  mt-2 py-1.5 w-full border-2 rounded-md active:scale-90 uppercase text-sm ${isSelected ? 'bg-white text-primary hover:bg-white hover:text-primary' : 'text-primary border-primary hover:bg-primary/80 hover:text-white dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-400 dark:hover:text-white'
                        }   `}>
                        {
                            isSelected ? 'Votado' : 'Votar'
                        }
                    </button> */}
                </div>
            <div className="p-0">
                <img
                    src={image}
                    alt={name}
                    width={250}
                    height={250}
                    loading="lazy"
                    className={`w-full h-56 md:h-72 object-cover ${isSelected ? '' : 'grayscale'}`}
                />
                
            </div>
        </motion.li>
    );
};

export default CharacterCard;
