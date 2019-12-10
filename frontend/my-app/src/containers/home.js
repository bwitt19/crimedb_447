import React, { Component } from 'react';
import Filter from '../components/filterComponent/filter';
import MyCarousel from '../components/carouselComponent/mycarousel.js';


class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {data: []};
  }

  fromChild(params) {
    this.setState({data: params.data});
  }

  render() {
  return (
      <div className="Home">
        <MyCarousel data={this.state.data}/>
        <Filter callback={this.fromChild.bind(this)} /> 
      </div>
      
    );
  }
}
export default Home;

