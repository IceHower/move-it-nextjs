import { useEffect, useState, useContext } from 'react'
import styles from '../styles/components/Countdown.module.css';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';


let countdownTimeOut: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);
    const { minutes, seconds, isActive, hasFinished, resetCountdown, pauseCountdown, startCountdown , time} = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    
    
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