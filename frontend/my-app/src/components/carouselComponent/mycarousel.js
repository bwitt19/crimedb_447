import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Map, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import 'leaflet/dist/leaflet.css';

class myCarousel extends Component {

  constructor(props){
    super(props);
  }

    render() {

      const topCorner = Leaflet.latLng(39.404897, -76.838722)
      const bottomCorner = Leaflet.latLng(39.179312, -76.389313)   
      const bounds = Leaflet.latLngBounds(topCorner, bottomCorner)

      return (
          <div class="my-carousel">
            <Carousel interval={false}>
              <Carousel.Item>
                <div class="carousel-slide">

                  <Map id="heatmap" center={[39.2904, -76.6122]} zoom={12} minZoom={12}  maxBoundsViscosity={0.5} maxBounds={bounds}>         
                    <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />        
                  </Map> 

                </div>                 
              </Carousel.Item>
              
               <Carousel.Item>
                <div class="carousel-slide" style={{background:'green'}}></div>                 
              </Carousel.Item>
              <Carousel.Item>
                <div class="carousel-slide" style={{background:'red'}}></div>                 
              </Carousel.Item> 
            </Carousel>

	    {/* {JSON.stringify(this.props.data, null, 2) }   */}
          </div>
        );

    }


}

export default myCarousel;
