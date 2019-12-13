import React, { Component } from 'react';
import Filter from '../components/filterComponent/filter';
import MyCarousel from '../components/carouselComponent/mycarousel.js';


class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: [],
      jwt : this.props.userData.jwt,
      filters : this.props.userData.filters,
      loggedIn : this.props.userData.loggedIn,
      user_name : this.props.userData.user_name
    };
  }

  fromChild(params) {
    this.setState({data: params.data});
  }

  render() {

  return (
      <div class="home">
        <MyCarousel data={this.state.data}/>
        <Filter userData={this.props.userData} callback={this.fromChild.bind(this)} /> 
      </div>
      
    );
  }
}
export default Home;

