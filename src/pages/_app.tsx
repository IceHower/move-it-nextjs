import '../styles/global.css';
import { ChallengesProvider } from '../contexts/ChallengeContext';
import ChallengeBox from '../components/ChallengeBox';

function MyApp({ Component, pageProps }) {
  
  return(
  <ChallengesProvider>
    <Component {...pageProps} />
  </ChallengesProvider>
  )
}

export default MyApp
