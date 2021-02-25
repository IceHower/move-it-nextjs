import Head from 'next/head'
import ExperienceBar from '../components/ExperienceBar';
import '../styles/global.css'

export default function Home() {
  return (
    <div className="container">
      <ExperienceBar />
    </div>
  );
}

