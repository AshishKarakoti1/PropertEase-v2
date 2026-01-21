import React from 'react'
import Side_Bar from '../Profile_Page/Side_Bar'
import MyFavorites from './MyFavorites'
import { ToastContainer } from 'react-toastify'

const FavoritePage = () => {
    return (
        <div className='flex w-full min-h-screen'>
            <MyFavorites />
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default FavoritePage