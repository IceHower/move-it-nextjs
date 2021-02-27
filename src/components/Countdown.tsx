import { useEffect, useState, useContext } from 'react'
import styles from '../styles/components/Countdown.module.css';
import { ChallengesContext } from '../contexts/ChallengeContext';


let countdownTimeOut: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const minutes = Math.floor(time) / 60;
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    
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
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeOut = setTimeout(() => setTime(time - 1), 1000);
        } else if(isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            console.log('Finalizou uhu!');
            startNewChallenge();
        }
    }, [isActive, time]);
    
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <div className={styles.buttonContainer} >

            {hasFinished  ? (
                <button 
                disabled
                className={styles.countdownButton}
                style={{width: '100%'}}
                >
                    Ciclo finalizado
                </button>)
                :
                (   <>
                    {time == 25 * 60 ? (
                        
                        <button type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown}
                        >
                            Iniciar um Ciclo
                        </button>
                    ) :
                    (
                        <button type="button" 
                        className={`${styles.countdownButton} ${styles.resetButton}`}
                        onClick={resetCountdown}
                        >
                            Abandonar Ciclo
                        </button>
                    )}

                    {isActive ?
                    (
                    <button className={styles.pauseButton} onClick={pauseCountdown}>
                        |  |
                    </button>) :
                    (<button className={styles.pauseButton} onClick={pauseCountdown}>
                        Play
                    </button>
                    )
                    }
                    </>
                )
            }
           
            </div>
        </div>)
      
}