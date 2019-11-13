import React, { Component } from 'react';
import './App.css';
import Header from './components/headerComponent/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Filter from './components/filterComponent/filter';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Filter />
      </div>
    );
  }
}

export default App;
