import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, List, Star, Home, LogOut } from 'lucide-react';

const Side_Bar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'My Listings', path: '/myListings', icon: List },
        { name: 'My Favorites', path: '/myFavorites', icon: Star },
    ];

    return (
        <div className='bg-gray-900 h-screen w-72 flex flex-col justify-between sticky top-0 p-6'>
            <div className='space-y-8'>
                <div className='flex items-center gap-3 px-2'>
                    <div className='bg-indigo-600 p-2 rounded-lg'>
                        <Home className='text-white' size={24} />
                    </div>
                    <span className='text-xl font-bold text-white'>PropertEase</span>
                </div>

                <nav className='space-y-2'>
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                                location.pathname === item.path 
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <item.icon size={20} />
                            <span className='font-medium'>{item.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <button 
                onClick={handleLogout}
                className='w-full flex items-center justify-center gap-3 p-4 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold border border-red-500/20'
            >
                <LogOut size={20} />
                Log out
            </button>
        </div>
    );
}

export default Side_Bar;