import { useContext } from 'react'
import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {
    const { minutes, seconds, isActive, hasFinished, resetCountdown, pauseCountdown, startCountdown , time} = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    console.log(minuteRight);

    
    
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