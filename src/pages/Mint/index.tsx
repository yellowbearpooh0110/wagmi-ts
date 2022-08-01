import * as React from 'react';

import './styles.scss';

import Navbar from 'components/Navbar';
import Banner from 'components/Banner';
import About from 'components/About';
import Membership from 'components/Membership';
import Feature from 'components/Feature';
import Contactus from 'components/Contactus';
import Footer from 'components/Footer';

const Mint: React.FC = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="bgm">
        <About />
        <Membership />
        <Feature />
        <Contactus />
        <Footer />
      </div>
    </>
  );
};

export default Mint;
