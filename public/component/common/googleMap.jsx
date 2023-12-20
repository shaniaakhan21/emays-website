import React, { useEffect, useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap as GoogleMapLib, Marker } from 'react-google-maps';

// Add map styles after api keys acquired
// eslint-disable-next-line max-len
const mapStyle = [{ 'featureType': 'administrative', 'elementType': 'all', 'stylers': [{ 'saturation': '-100' }] }, { 'featureType': 'administrative.province', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'landscape', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'lightness': 65 }, { 'visibility': 'on' }] }, { 'featureType': 'poi', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'lightness': '50' }, { 'visibility': 'simplified' }] }, { 'featureType': 'road', 'elementType': 'all', 'stylers': [{ 'saturation': '-100' }] }, { 'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road.arterial', 'elementType': 'all', 'stylers': [{ 'lightness': '30' }] }, { 'featureType': 'road.local', 'elementType': 'all', 'stylers': [{ 'lightness': '40' }] }, { 'featureType': 'transit', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'visibility': 'simplified' }] }, { 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'hue': '#ffff00' }, { 'lightness': -25 }, { 'saturation': -97 }] }, { 'featureType': 'water', 'elementType': 'labels', 'stylers': [{ 'lightness': -25 }, { 'saturation': -100 }] }];

const MyMapComponent = withScriptjs(withGoogleMap((props) => <GoogleMapLib
    defaultZoom={8}
    defaultCenter={ props?.latLan ? { lat: props.latLan.lat, lng: props.latLan.lan } :
        { lat: 45.464664, lng: 9.188540 }}
>
    {props.isMarkerShown && props?.latLan && <Marker position={{ lat: props?.latLan?.lat,
        lng: props?.latLan?.lan }} />}
</GoogleMapLib>
));

const GoogleMap = (props) => { 

    const [key, setKey] = useState(0);
    useEffect(() => {
        setKey((prevKey) => prevKey + 1);
    }, [props?.latLan]);
    return props?.mapAPIKey && <MyMapComponent
        key={key}
        latLan={props?.latLan}
        isMarkerShown
        // eslint-disable-next-line max-len
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${props?.mapAPIKey}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
    />; };

export default GoogleMap;
