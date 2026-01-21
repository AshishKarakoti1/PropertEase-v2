import React from 'react';
import Email from './Email';
import { ToastContainer } from 'react-toastify';

const Email_Page = () => {
    return (
        <div className='bg-[url(/bg-buy.jpg)] bg-center bg-repeat bg-cover bg-fixed'>
            <Email />
            <ToastContainer />
        </div>
    )
}

export default Email_Page
