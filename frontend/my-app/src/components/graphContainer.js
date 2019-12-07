import React from 'react';
import Graph from './graphComponent/graph';

class GraphContainer extends React.Component {
    state = { dataSet: [] };

    // get data here
    componentDidMount() {
        
        fetch('/crimes/filter?upper_date=2011')
        .then( response => response.json())
        .then(data => this.setState({ dataSet: data.crimes}));

    }

    render() {
        return (
        <div>
            <Graph 
            width={100}
            height={5}
            data={this.state.dataSet} 
            />
        </div>
        )
    }

}

export default GraphContainer;