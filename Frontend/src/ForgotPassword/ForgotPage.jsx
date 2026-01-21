import React from 'react';
import Forgot from './Forgot';
import styles from '../SignUp_Login/SignUp_Login.module.css';

const ForgotPage = () => {
    return (
        <div className={styles.container}>
            {/* The container ensures full-screen centering and consistent background styling */}
            <div className="flex items-center justify-center min-h-screen w-full px-4">
                <Forgot />
            </div>
        </div>
    );
};

export default ForgotPage;