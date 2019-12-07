import React from 'react';
import {Bar} from 'react-chartjs-2';
import d3 from 'd3';




class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }

        // this.customFunction = this.customFunction.bind(this);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Bar 
                    data={this.state.data}
                    width={100}
                    height={50}
                />
            </div>
        )
    }

}

export default Graph;


