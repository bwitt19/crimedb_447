import React, { Component } from 'react';
import Filter from '../components/filterComponent/filter';


class Home extends Component {
  
  constructor(props){
    super(props);
  }

  render() {
  return (
      <div className="Home">
        <Filter />
      </div>
    );
  }
}
export default Home;

