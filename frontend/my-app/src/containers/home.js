import React, { Component } from 'react';
import Filter from '../components/filterComponent/filter';
import MyCarousel from '../components/carouselComponent/mycarousel.js';


class Home extends Component {
  
  constructor(props){
    super(props);
  }

  render() {
  return (
      <div className="Home">
        <MyCarousel />
        <Filter />   
      </div>
      
    );
  }
}
export default Home;

