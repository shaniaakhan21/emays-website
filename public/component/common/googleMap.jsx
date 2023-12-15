import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap as GoogleMapLib, Marker } from 'react-google-maps';

// Add map styles after api keys acquired
// eslint-disable-next-line max-len
const mapStyle = [{ 'featureType': 'administrative', 'elementType': 'all', 'stylers': [{ 'saturation': '-100' }] }, { 'featureType': 'administrative.province', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'landscape', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'lightness': 65 }, { 'visibility': 'on' }] }, { 'featureType': 'poi', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'lightness': '50' }, { 'visibility': 'simplified' }] }, { 'featureType': 'road', 'elementType': 'all', 'stylers': [{ 'saturation': '-100' }] }, { 'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road.arterial', 'elementType': 'all', 'stylers': [{ 'lightness': '30' }] }, { 'featureType': 'road.local', 'elementType': 'all', 'stylers': [{ 'lightness': '40' }] }, { 'featureType': 'transit', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'visibility': 'simplified' }] }, { 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'hue': '#ffff00' }, { 'lightness': -25 }, { 'saturation': -97 }] }, { 'featureType': 'water', 'elementType': 'labels', 'stylers': [{ 'lightness': -25 }, { 'saturation': -100 }] }];

const MyMapComponent = withScriptjs(withGoogleMap((props) => <GoogleMapLib
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
>
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
</GoogleMapLib>
));

const GoogleMap = (googleMapAPIKey) => (<MyMapComponent
    isMarkerShown
    // eslint-disable-next-line max-len
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapAPIKey}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: '100%' }} />}
    containerElement={<div style={{ height: '400px' }} />}
    mapElement={<div style={{ height: '100%' }} />}
/>);

export default GoogleMap;
