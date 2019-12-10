import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

class myCarousel extends Component {

  constructor(props){
    super(props);
  }

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

            {JSON.stringify(this.props.data, null, 2) } 
          </div>
        );

    }


}

export default myCarousel;