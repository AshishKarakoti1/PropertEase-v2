import React from 'react';
import Profile from './Profile';
import Side_Bar from './Side_Bar';

const Profile_Page = () => {
    return (
        <div className='flex w-full min-h-screen bg-gray-50'>
            <div className='flex-grow overflow-y-auto'>
                <Profile />
            </div>
        </div>
    );
};

export default Profile_Page;