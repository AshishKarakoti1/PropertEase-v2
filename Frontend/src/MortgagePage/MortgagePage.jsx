import React from 'react';
import NavBar from '../LandingPage/NavBar';
import MortgageCalculator from './MortgageCalculator';
import { ToastContainer } from 'react-toastify';

const MortgagePage = () => {
    return (
        <div className='bg-[url(/bg-buy.jpg)] bg-center bg-no-repeat bg-cover bg-fixed'>
            <NavBar />
            <MortgageCalculator />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                theme="light"
            />
        </div>
    )
}

export default MortgagePage;