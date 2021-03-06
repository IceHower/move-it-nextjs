import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void,

}

//boa praticar tipar o children
//ReactNode -> Quando um children de um componente, tambem é um componente react posso importar o ReactNode
//ReactNode vai aceitar qualquer elemento como children (pode ser um texto, tag html, componente react)
interface ChallengerProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}
// Fala que o valor inicial recebe as tipagens de ChallengesContextData, assim consigo acessar as funções passadas.
export const ChallengesContext = createContext({} as ChallengesContextData); 
//Vamos exportar os values qque vão conter no Provider do ChallengesContext em forma de Componente
//Isso é só para não deixar o app muito poluido com funções e objetos.
export function ChallengesProvider( {children, ...rest}: ChallengerProviderProps ){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrenceExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenges] = useState(null);
    const [isLevelUpModalUp, setIsLevelUpModalUp] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('challengesCompleted', String(challengesCompleted));
        Cookies.set('currentExperience', String(currentExperience));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalUp(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalUp(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenges(challenge);

        new Audio('/notification.mp3').play();
        if(Notification.permission === 'granted') {
            new Notification('Novo Desafio :)', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
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
                closeLevelUpModal
            }}
            >

            {children}

            {isLevelUpModalUp && 
                <LevelUpModal />
            }
            
        </ChallengesContext.Provider>
    )
}
