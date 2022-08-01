import * as React from 'react';

import './styles.scss';
import featureHeadImg from 'img/feature-head.png';
import featurePointImg from 'img/feature-point.png';

const Feature: React.FC = () => {
  return (
    <section className="membershipFeature" id="feature">
      <div className="container">
        <div className="feature__obj1">
          <img src={featureHeadImg} alt="feature" />
        </div>
        <div className="feature__obj2">
          <img src={featurePointImg} alt="feature" />
        </div>
        <div className="row align-items-center">
          <div className="col-xxl-4">
            <div className="member__text">
              <h2>
                <span>Memberships</span>
                <span>Features</span>
              </h2>
            </div>
          </div>
          <div className="col-xxl-8">
            <div className="memberFeature__right">
              <div className="privilegesMain">
                <h5>Privileges</h5>
                <div className="privilegesMain__box diagonal">
                  <div className="inside">
                    <ul className="privilegesMain__list">
                      <li>Exclusive Membership Chat</li>
                      <li>Members Exclusive Events</li>
                      <li>Comlimentary Drinks</li>
                      <li>Point Rewards / Redeems*</li>
                      <li>Profit Sharing*</li>
                      <li>Access to Partnership Events</li>
                      <li>International DJ Events*</li>
                      <li>NFT Showcase</li>
                      <li>Personalized Entrance Music</li>
                      <li>Priority Seating</li>
                      <li>Driving On-Call</li>
                      <li>Dedicating Parking Space</li>
                      <li>Dedicated Private Area</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mmbrAns__feature">
                <div className="mmbrAns__feature__head diagonal">
                  <div className="inside">
                    <p>Genesis</p>
                  </div>
                </div>
                <div className="ans__feature diagonal">
                  <div className="inside">
                    <ul className="ans__feature__list">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mmbrAns__feature aurora">
                <div className="mmbrAns__feature__head diagonal">
                  <div className="inside">
                    <p>Aurora</p>
                  </div>
                </div>
                <div className="ans__feature diagonal">
                  <div className="inside">
                    <ul className="ans__feature__list">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mmbrAns__feature nove">
                <div className="mmbrAns__feature__head diagonal">
                  <div className="inside">
                    <p>Nova</p>
                  </div>
                </div>
                <div className="ans__feature diagonal">
                  <div className="inside">
                    <ul className="ans__feature__list">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mmbrAns__feature supernova">
                <div className="mmbrAns__feature__head diagonal">
                  <div className="inside">
                    <p>Supernova</p>
                  </div>
                </div>
                <div className="ans__feature diagonal">
                  <div className="inside">
                    <ul className="ans__feature__list">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
