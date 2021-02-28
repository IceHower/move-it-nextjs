import { createContext, ReactNode, useState, useContext, useEffect  } from 'react';
import { ChallengesContext } from './ChallengeContext';


interface CountdownContextData {
    isActive: boolean;
    time: number;
    hasFinished: boolean;
    minutes: number;
    seconds: number;
    resetCountdown: () => void;
    pauseCountdown: () => void;
    startCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);
let countdownTimeOut: NodeJS.Timeout;


export function CountdownContextProvider( {children}: CountdownProviderProps ) {
    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const minutes = Math.floor(time / 60 );
    const seconds = time % 60;

    
    function startCountdown() {
        setIsActive(true);    
    }

    function pauseCountdown() {
        if (!!isActive) {
            setIsActive(false);
            clearTimeout(countdownTimeOut);
            return
        }
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeOut); // Passa a variavel que esta recebendo o setTimeout. 
        setIsActive(false);
        setHasFinished(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeOut = setTimeout(() => setTime(time - 1), 1000);
            console.log(time)
        } else if(isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            console.log('Finalizou uhu!');
            startNewChallenge();
        }
    }, [isActive, time]);



    return (
        <CountdownContext.Provider 
        value={{minutes, 
                seconds, 
                time,
                resetCountdown, 
                pauseCountdown, 
                startCountdown, 
                isActive, 
                hasFinished}}>
                    {children}
        </CountdownContext.Provider>
    )
}