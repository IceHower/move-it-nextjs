import styles from '../styles/components/Profile.module.css'
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext'

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/icehower.png" alt="Vinicius Telles"/>
            <div>
                <strong>Vinicius Telles</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level { level }
                </p>
            </div>
        </div>
    )
}