import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import styles from './SignUp_Login.module.css';
import { useLocation } from 'react-router-dom';

const SignUp_Login = () => {
    const location = useLocation();
    
    return (
        <div className={styles.container}>
            {(location.pathname === '/' || location.pathname === '/login') && <Login />}
            {location.pathname === '/signup' && <SignUp />}
        </div>
    );
}

export default SignUp_Login;
