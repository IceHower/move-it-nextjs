import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import {Profile} from "../components/Profile";
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';
import ChallengeBox  from "../components/ChallengeBox";
import { CountdownContextProvider } from '../contexts/CountdownContext';
import { GetServerSideProps } from 'next';
import { ChallengesProvider } from '../contexts/ChallengeContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  userToken: string;
}
export default function Home(props : HomeProps) {
  return (
    <ChallengesProvider 
    level={props.level} 
    currentExperience={props.currentExperience} 
    challengesCompleted={props.challengesCompleted}
    >
      
      <div className={styles.container}>
        <Head>
          <title>Move It</title>
        </Head>
        <ExperienceBar />
      <CountdownContextProvider>
        <section>
          <div>
            <Profile />
            <CompleteChallenges />
            <Countdown />
          </div>

          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownContextProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async(context) => {

  const { level, currentExperience, challengesCompleted, userToken } = context.req.cookies; // Pega todos os cookies que tem na aplicação
  if(!userToken) {
    return {
        redirect: {
          destination: '/',
          permanent: false,
        }
  }
}
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}