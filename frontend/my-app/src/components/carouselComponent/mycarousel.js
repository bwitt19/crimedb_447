import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Map, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import 'leaflet/dist/leaflet.css';

class myCarousel extends Component {

    constructor(props){
        super(props);
        this.state = {currSlide: 0, sliding: false};
	//this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }

    changeSlide(newSlide) {
	this.setState({currSlide: newSlide, sliding: true});
    }

    toggleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else{
        e.dataSeries.visible = true;
      }
      this.chart.render();
    }

    render() {

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
                <div class="carousel-slide">
	  
		

		</div>                 
              </Carousel.Item>
              <Carousel.Item>
                <div class="carousel-slide" style={{background:'red'}}></div>                 
              </Carousel.Item> 
            </Carousel>

	  {/* {JSON.stringify(this.props.data, null, 2) }  */}
          </div>
        );

    }


}

export default myCarousel;
