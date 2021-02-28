import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number,
}
interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    experienceToNextLevel: number,
    activeChallenge: Challenge,
    levelUp:() => void,
    startNewChallenge:() => void,
    resetChallenge:() => void,
    completeChallenge: () => void,

}

//boa praticar tipar o children
//ReactNode -> Quando um children de um componente, tambem é um componente react posso importar o ReactNode
//ReactNode vai aceitar qualquer elemento como children (pode ser um texto, tag html, componente react)
interface ChallengerProviderProps {
    children: ReactNode;
}
// Fala que o valor inicial recebe as tipagens de ChallengesContextData, assim consigo acessar as funções passadas.
export const ChallengesContext = createContext({} as ChallengesContextData); 
//Vamos exportar os values qque vão conter no Provider do ChallengesContext em forma de Componente
//Isso é só para não deixar o app muito poluido com funções e objetos.
export function ChallengesProvider( {children}: ChallengerProviderProps ){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrenceExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenges] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenges(challenge);
    }

    function resetChallenge() {
        setActiveChallenges(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

       const { amount } = activeChallenge;

       let finalExperience = currentExperience + amount;

       if (finalExperience >= experienceToNextLevel) {
           finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
       }

       setCurrenceExperience(finalExperience);
       setActiveChallenges(null);
       setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
        value={{level, 
                currentExperience, 
                challengesCompleted, 
                levelUp, 
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
            }}
            >

            {children}
        </ChallengesContext.Provider>
    )
}
