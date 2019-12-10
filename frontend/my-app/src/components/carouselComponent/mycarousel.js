import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

class myCarousel extends Component {

    render() {
        return (
          <div class="my-carousel">
            <Carousel>
              <Carousel.Item>
                <div class="carousel-slide"></div>                 
              </Carousel.Item>
              <Carousel.Item>
                <div class="carousel-slide" style={{background:'green'}}></div>                 
              </Carousel.Item>
              <Carousel.Item>
                <div class="carousel-slide" style={{background:'red'}}></div>                 
              </Carousel.Item>
            </Carousel>
          </div>
        );

    }


}

export default myCarousel;