import * as React from 'react';

import './styles.scss';

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="about__title">
              <h1>
                <span>About</span> <span className="d-block text-end">Us</span>
              </h1>
            </div>
          </div>
          <div className="col-lg-6">
            <p>
              We are bringing an entirely new experience to NFT holders by
              offering an exclusive membership that provides value, yield
              bearing and real-life utilities exclusively to the WAGMI NFT CLUB
              Holder.
            </p>
            <p>
              {' '}
              Located in Malaysia, WAGMI NFT Club is a decentralized club that
              is ideal for social engagement, events and an overall fun space
              for NFT holders to connect with other individuals who are
              interested in the world of NFTs.
            </p>
            <p>
              The Club would be operated by world class experience Operator,
              with more than 10 years of experience in managing over 10 pubs &
              bistros across Malaysia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
