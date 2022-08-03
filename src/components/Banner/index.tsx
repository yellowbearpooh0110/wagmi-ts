import * as React from 'react';

// import './styles.scss';
import bannerImg from 'img/banner.jpg';

const Banner: React.FC = () => {
  return (
    <section>
      <div className="banner__main">
        <div className="video">
          <video className="tv_video" autoPlay muted>
            <source
              src="https://mywagmi.com/video/video.mp4"
              // src="test.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="mute-bt"></div>
        <div className="banner__img">
          <img src={bannerImg} alt="banner" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
