import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto h-20 px-36 flex justify-between items-center text-xl">

        {/* Logo */}
        <button onClick={() => navigate('/')} className='font-bold'>
            PropertEase
        </button>

        {/* Links */}
        <div className="flex gap-4">
          <Link to="/buy" className='no-underline text-black'>Buy</Link>
          <Link to="/sell" className='no-underline text-black'>Sell</Link>
          <Link to="/mortgage-calculator" className='no-underline text-black'>Mortgage</Link>
        </div>

        {/* Auth */}
        {token ? (
          <div>
            <button onClick={() => setOpen(!open)}>
              {localStorage.getItem('loggedInUser')}
            </button>

            {open && (
              <div className='flex flex-col absolute bg-white border mt-2 p-4 gap-3 z-50 rounded-lg'>
                <button onClick={() => navigate('/profile')}>Profile</button>
                <button onClick={() => navigate('/myListings')}>My Listings</button>
                <button onClick={() => navigate('/myFavorites')}>Favourites</button>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-indigo-600 rounded-full px-3 py-1 text-white'>Login</button>
        )}

      </div>
    </nav>
  );
};

export default NavBar;
