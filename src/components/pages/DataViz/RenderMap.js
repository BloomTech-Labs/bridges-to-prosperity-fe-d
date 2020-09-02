import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState, useRef, useCallback, useContext } from 'react';
import ReactMapGL, { FullscreenControl, NavigationControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { BridgesContext } from '../../../state/bridgesContext';
import Markers from './Markers';

const RenderMap = props => {
  const [viewport, setViewport] = useState({
    latitude: -1.9444,
    longitude: 30.0616,
    zoom: 7.8,
    bearing: 0,
    pitch: 0,
  });
  const { bridgeData, detailsData, setDetailsData } = useContext(
    BridgesContext
  );
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    newViewport => setViewport(newViewport),
    []
  );
  console.log(detailsData);
  return (
    <div className="mapbox-react">
      <ReactMapGL
        id="map"
        // className="map"
        ref={mapRef}
        {...viewport}
        width="90%"
        height="800px"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <div ref={geocoderContainerRef} className="search-bar">
          <Geocoder
            mapRef={mapRef}
            countries="rw"
            marker={false}
            onViewportChange={handleViewportChange}
            containerRef={geocoderContainerRef}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            position="top-left"
          />
        </div>
        <div style={{ position: 'absolute', right: 10, top: 150 }}></div>{' '}
        <div style={{ position: 'absolute', right: 10, top: 10 }}>
          <FullscreenControl onClick={() => console.log('yes?')} />
        </div>{' '}
        <div style={{ position: 'absolute', right: 10, top: 50 }}>
          <NavigationControl />
        </div>
        <Markers
          style={{ position: 'relative' }}
          setViewport={setViewport}
          bridgeData={bridgeData}
        />{' '}
        {detailsData && (
          <div className="descriptionContainer">
            <div onClick={() => setDetailsData(null)}>
              <i class="fas fa-times"></i>
            </div>

            <p className="descriptionBox">{detailsData.district} </p>
          </div>
        )}
      </ReactMapGL>
    </div>
  );
};

export default RenderMap;
