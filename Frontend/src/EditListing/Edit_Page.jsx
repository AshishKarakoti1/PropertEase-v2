import React from 'react';
import NavBar from '../LandingPage/NavBar';
import Edit from './Edit';
import { ToastContainer } from 'react-toastify';

const Edit_Page = () => {
    return (
        <div className='bg-[url(/bg-buy.jpg)] bg-center bg-no-repeat bg-cover bg-fixed'>
            <Edit />
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default Edit_Page;