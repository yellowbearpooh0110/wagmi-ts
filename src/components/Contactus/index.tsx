import * as React from 'react';

// import './styles.scss';

const Contactus: React.FC = () => {
  return (
    <section className="contactus" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 order-1 order-lg-0">
            <div className="contactus__form">
              <form>
                <div className="frm__group">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
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
                <div className="frm__group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <div className="diagonal">
                    <div className="inside">
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Type your message here"
                        cols={30}
                        rows={10}
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="formsendbtn">
                  <button type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="263.071"
                      height="85.001"
                      viewBox="0 0 263.071 85.001"
                    >
                      <g transform="translate(-698.715 -8050.912)">
                        <path
                          d="M0,16.461v36.5L26.007,78.964H240.572v-36.5L214.565,16.461Z"
                          transform="translate(710.964 8045.699)"
                          fill="none"
                          stroke="#62ec2d"
                          strokeWidth="2"
                        />
                        <text
                          transform="translate(735.25 8071.877)"
                          fill="#fff"
                          fontSize="40"
                          fontFamily="BebasNeue, Bebas Neue"
                        >
                          <tspan x="62.5" y="36">
                            SEND
                          </tspan>
                        </text>
                        <path
                          d="M0,16.461v36.5L26.007,78.964H240.572v-36.5L214.565,16.461Z"
                          transform="translate(709.964 8045.7)"
                          fill="none"
                          stroke="#2deccf"
                          strokeWidth="4"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 order-0 order-lg-1">
            <div className="contactus__text">
              <h2>
                <span>Contact</span> <span>Us</span>{' '}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
