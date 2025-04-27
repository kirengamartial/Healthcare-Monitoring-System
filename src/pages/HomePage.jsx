import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import KeyMetrics from '../components/KeyMetrics';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import TeamSection from '../components/TeamSection';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';

const HomePage = () => {

  return (
    <div className="min-h-screen bg-white font-sans">
     <Header/>
     <HeroSection/>
     <KeyMetrics/>
     <FeaturesSection/>
     <AboutSection/>
     <TeamSection/>
     <CallToActionSection/>
     <Footer/>
    </div>
  );
};

export default HomePage;