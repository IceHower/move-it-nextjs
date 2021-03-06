import styles from '../styles/pages/Login.module.css';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';

interface LoginProps {
  userToken: string;
}
export default function login (props: LoginProps) {

    const [user, setUser] = useState('');
    const [userToken, setUserToken] = useState('');

    function handleLogin(email) {
      Cookies.set('userToken', String(email));
    }
    return (
        <div className={styles.container}>
            <section>
                <div>
                    <img src="/icons/Simbolo.svg" alt="simbolo pagina de login"/>
                </div>
            
                <div className={styles.loginContainer}>
                    <img src="/Logo.svg" alt="Logo MoveIt"/>
                    <strong>Bem-vindo</strong>
                    <div>
                        <img src="/icons/Github.svg" alt="Logo Github"/>
                        <p>Faça o login com seu Github para começar</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <input type="email" placeholder="Digite seu username" onChange={e =>  setUser(e.target.value)}/>

                        {user ?
                        (
                        <button type="submit" style={{background: 'var(--green)'}}>
                            <img src="/icons/Vector.svg" alt="Entrar"/>
                        </button>
                        )
                        :
                        (
                        <button type="submit" onClick={() => handleLogin(user)}>
                            <img src="/icons/Vector.svg" alt="Entrar"/>
                        </button>
                        )
                        }
                        
                    </div>
                </div>
            </section>
        </div>
    )
}

// export const getServerSideProps: GetServerSideProps = async({req, res}) => {

//     const  userToken  = req.cookies;
//     if(userToken) {
//       return {
//         redirect: {
//           destination: '/dashboard',
//           permanent: false,
//         }
//       }
//     }
//     return {
//       props: { userToken }
//     }
//   }