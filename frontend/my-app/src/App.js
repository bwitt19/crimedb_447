import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import Header from './components/headerComponent/header';
import Filter from './components/filterComponent/filter';
import Graph from './components/graphComponent/graph';
import Button from 'react-bootstrap/Button';
import GraphContainer from './components/graphContainer';

import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

import { Bar } from 'react-chartjs-2';



class App extends Component {

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


  constructor(props) {
    super(props);
    this.state = {
      graphType: "",
      dataSet: [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
      ]
    }
  }


  render() {
    return (
      <div className="App">
        <GraphContainer
          data={this.state.dataset}
        />
      </div>
    );
  }

}

export default App;
