import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar() {
    const {currentExperience, experienceToNextLevel} = useContext(ChallengesContext);
    const perCentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div> 
                <div style={{width: `${perCentToNextLevel}%`}}/>
                <span className={styles.currentExperience} style={{ left: `${perCentToNextLevel}%`}}>{currentExperience}</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}