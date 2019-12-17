import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Map, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import 'leaflet/dist/leaflet.css';
import BarChart from 'react-bar-chart';

class myCarousel extends Component {

    constructor(props){
        super(props);
        this.state = {currSlide: 0, sliding: false};
	this.state.barwidth = 600;
	this.state.barheight = 600;
    }

    changeSlide(newSlide) {
	this.setState({currSlide: newSlide, sliding: true});
    }

    componentDidMount = () => {
	window.onresize = () => {
	    this.setState({barwidth: this.refs.root.offsetWidth}); 
	    this.setState({barheight: this.refs.root.offsetHeight}); 
	};
    }


    render() {

      // Code for rendering heatmap
      const topCorner = Leaflet.latLng(39.404897, -76.838722)
      const bottomCorner = Leaflet.latLng(39.179312, -76.389313)   
      const bounds = Leaflet.latLngBounds(topCorner, bottomCorner)
      const addressPoints = [];
      const gradient = {0.2: 'blue', 0.3: 'cyan', 0.5:'#aeff00',0.6:'#ffbf00',0.8:'#ff8000', 0.9: '#ff4d00', 1.0: '#ff0000'};

	// Push the datapoints into the heatmap layer
	for (var x= 0; x < this.props.data.length; x++) {
	    if(!(isNaN(this.props.data[x].latitude) || isNaN(this.props.data[x].longitude != null)))
	      addressPoints.push([Number(this.props.data[x].latitude), Number(this.props.data[x].longitude), 0.1])
      }


        // Code for rendering timeline chart
	var data = [
	    {text: 'Jan', value:0},
	    {text: 'Feb', value:0},
	    {text: 'Mar', value:0},
	    {text: 'Apr', value:0},
            {text: 'May', value:0},
            {text: 'Jun', value:0},
	      {text: 'Jul', value: 0}, 
	      {text: 'Aug', value: 0},
	      {text: 'Sep', value: 0},
	      {text: 'Oct', value: 0},
	      {text: 'Nov', value: 0},
	      {text: 'Dec', value: 0},
	];

	for (var x= 0; x < this.props.data.length; x++) {
	    if(this.props.data[x].date != null) {
		var datDate = new Date(this.props.data[x].date);
		//alert(datDate.getMonth() - 1);
		if(datDate.getMonth() >= 0 && datDate.getMonth() < 13) 
		    data[datDate.getMonth()].value += 1;
		
	    }
	}
	
	const margin = {top: 20, right: 20, bottom: 30, left: 40};

      return (
          <div class="my-carousel">
              <Carousel interval={false} slide={false} touch={false} onSelect={this.changeSlide.bind(this)} >
              
	    <Carousel.Item>
                <div class="carousel-slide">

	  {this.state.currSlide != 0 ?
	   (<div></div>) : (
	  
                  <Map id="heatmap" center={[39.2904, -76.6122]} zoom={12} minZoom={12}  maxBoundsViscosity={0.5} maxBounds={bounds}>         
              <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={addressPoints}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => parseFloat(m[2])}
	  max={0.5}
	  blur={30}
	  gradient={gradient}
	  minOpacity={0.5}
	      />
              <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />        
                  </Map> 
	   )}
                </div>                 
              </Carousel.Item>
              
               <Carousel.Item>
		<div ref='root'>
                <div class="carousel-slide">
		  <BarChart ylabel='Crime count'
		    width={this.state.barwidth}
		    height={this.state.barheight}
		    margin={margin}
		    data={data}
		    >
		  </BarChart>
		</div>
		</div>
              </Carousel.Item>
            </Carousel>

	  {/* {JSON.stringify(this.props.data, null, 2) }  */}
          </div>
        );

    }


}

export default myCarousel;
