import * as React from 'react';

import logoImg from 'img/logo.svg';
// import './styles.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-xl navbar-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logoImg} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarHeader">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#about">
                ABOUT US
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link membership" href="#membership">
                THE MEMBERSHIPS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link feature" href="#feature">
                FEATURES
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link contact" href="#contact">
                CONTACT US
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
