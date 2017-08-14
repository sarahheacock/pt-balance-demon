import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Carousel } from 'react-bootstrap';
import { Image } from 'cloudinary-react';

import EditButton from '../buttons/EditButton';
import { cloudName } from '../../data/data';


// const windowInnerHeight = () => Math.floor(window.innerHeight ||
//   document.documentElement.clientHeight ||
//   document.body.clientHeight); //height of window content
//
// const navHeight = () => {
//   const main = document.getElementById('navigation');
//   return (main) ? Math.floor(main["scrollHeight"] || main["clientHeight"]) : 0;
// };
//
// const homeHeight = () => {
//   const main = document.getElementById('homePageHeader');
//   return (main) ? Math.floor(main["scrollHeight"] || main["clientHeight"]) : 0;
// };

const Home = (props) => {
  // const height = windowInnerHeight() - homeHeight() - navHeight();

  const carouselImg = props.data[0]["carousel"].map((image, index) => (
    <Carousel.Item key={image}>
      {(!image.includes("http")) ?
        <Image className='carImg'
          id={`carImg${index}`}
          cloudName={cloudName}
          publicId={image}
          height="450"
          width="1200"
          crop="fill"/>:
        <img className="carouselImg" alt="900x500" src={image}/>
      }
      <Carousel.Caption>
        <h3 className="brand caption">PBS</h3>
        <p className="caption">{"Dr. Nancy Darr and Dr. Mary Rose Franjoine's research space."}</p>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  return (
    <div>


      <header id="carHeader">
        <div className="head" id="homePageHeader">
          <PageHeader className="head-title">Home</PageHeader>
        </div>
        <Carousel className="carousel-content">
          {carouselImg}
        </Carousel>
      </header>

      <div className="lower-content">

          <div className="home-content">
            <div className="content">
              <h3 className="text-center">Pediatric Balance Scale</h3><hr />
              {(props.data[0]["summary"].split('\n')).map((p, i) => <p key={`home0${i}`} className="summary text-center">{p}<br /></p>)}
              <div className="text-center">
                <EditButton
                  user={props.user}
                  dataObj={props.data[0]}
                  updateState={props.updateState}
                  title={"Edit"}
                />
              </div>
            </div>
        </div>
      </div>

    </div>
  );
}

export default Home;

Home.propsTypes = {
  data: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,

  updateState: PropTypes.func.isRequired
}
