import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignUp_Login from './SignUp_Login/SignUp_Login';
import Landing from './LandingPage/Landing';
import Buy from './Buying_page/Buy';
import SellPage from './Sell_page/SellPage';
import Listing_Page from './Single_Listing/Listing_Page';
import MyListingsPage from './Listing/MyListingsPage';
import FavoritePage from './Favorites/FavoritePage';
import Profile_Page from './Profile_Page/Profile_Page';
import Side_Bar from './Profile_Page/Side_Bar';
import Email_Page from './EmailPage/Email_Page';
import Edit_Page from './EditListing/Edit_Page';
import MortgagePage from './MortgagePage/MortgagePage';
import ForgotPage from './ForgotPassword/ForgotPage';
import ResetPage from './ResetPassword/ResetPage';

const App = () => {

  const location = useLocation();

  // Define the routes where the sidebar should be shown
  const showSidebar = ['/profile', '/myListings', '/myFavorites'].includes(location.pathname);

  return (
    <div className="w-full flex">
      {/* Conditionally render the sidebar only on specific pages */}
      {showSidebar && <Side_Bar />}

      {/* Main content area */}
      <div className={`flex-grow ${showSidebar ? 'w-[82%]' : 'w-full'}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<SignUp_Login />} />
          <Route path="/signup" element={<SignUp_Login />} />
          <Route path="/buy" element={<Buy />} />
          <Route path='/sell' element={<SellPage />} />
          <Route path='/details/:id' element={<Listing_Page />} />
          <Route path='/myListings' element={<MyListingsPage />} />
          <Route path='/myFavorites' element={<FavoritePage />} />
          <Route path='/profile' element={<Profile_Page />} />
          <Route path='/contact' element={<Email_Page />} />
          <Route path='/update/:id' element={<Edit_Page />} />
          <Route path='/mortgage-calculator' element={<MortgagePage />} />
          <Route path='/forgot-password' element={<ForgotPage />} />
          <Route path='/reset-password/:token' element={<ResetPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
