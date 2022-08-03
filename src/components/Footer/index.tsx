import * as React from 'react';

// import './styles.scss';
import logoFooter from 'img/logo-footer.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__logo">
          <img src={logoFooter} alt="footerlogo" />
        </div>
        <p>WANT TO RECEIVE THE LATEST NEWS?</p>
        <form action="#">
          <div className="frm__group mb-0">
            <div className="diagonal">
              <div className="inside">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
          </div>
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="263.071"
              height="85.003"
              viewBox="0 0 263.071 85.003"
            >
              <g transform="translate(-1123.465 -9672.91)">
                <path
                  d="M0,16.461v36.5L26.007,78.964H240.572v-36.5L214.565,16.461Z"
                  transform="translate(1134.714 9667.699)"
                  fill="none"
                  stroke="#54e8fa"
                  strokeWidth="2"
                />
                <text
                  transform="translate(1159 9693.877)"
                  fill="#fff"
                  fontSize="40"
                  fontFamily="BebasNeue, Bebas Neue"
                >
                  <tspan x="36" y="36">
                    GET MAIL!
                  </tspan>
                </text>
                <path
                  d="M0,16.461v36.5L26.007,78.964H240.572v-36.5L214.565,16.461Z"
                  transform="translate(1134.714 9667.699)"
                  fill="none"
                  stroke="#2deccf"
                  strokeWidth="4"
                />
              </g>
            </svg>
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
