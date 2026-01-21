import React from 'react';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import Services from './Services';
import FeaturedListings from './FeaturedListings';
import Reviews from './Reviews';
import Footer from './Footer';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <main>
        <section className="relative">
          <HeroSection />
        </section>
        <Services />
        <FeaturedListings />
        <Reviews />
      </main>

      <Footer />
    </div>
  );
};

export default Landing;