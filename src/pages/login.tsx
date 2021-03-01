import styles from '../styles/pages/Login.module.css';
import { useState } from 'react';

export default function login () {

    const [user, setUser] = useState('');

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
                        <button type="submit">
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