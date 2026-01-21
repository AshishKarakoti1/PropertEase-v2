import React from 'react';
import NavBar from '../LandingPage/NavBar';
import Selling_form from './Selling_form';

const SellPage = () => {
  return (
    <div className='bg-[url(/bg-buy.jpg)] bg-center bg-no-repeat bg-cover bg-fixed'>
      <NavBar />
      <Selling_form />
    </div>
  )
}

export default SellPage;