import React from 'react';
import Single_Listing from './Single_Listing';
import { ToastContainer } from 'react-toastify';

const Listing_Page = () => {
    return (
        <div className='min-h-screen bg-gray-50 flex flex-col'>
            <main className='flex-grow'>
                <Single_Listing />
            </main>
            <ToastContainer 
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Listing_Page;