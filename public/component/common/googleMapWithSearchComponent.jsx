import GoogleMapLatLan from './googleMapLatLan';
import GoogleMap from './googleMap';
import { useEffect, useState } from 'react';

const GoogleMapWithSearchBar = ({ googleMapAPIKey }) => {

    const [latLan, setLatLan] = useState(null);
    const [isTimeoutDone, serIsTimeOutDone] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            serIsTimeOutDone(true);
        }, 3000);
    });

    return (
        <>
            {
                googleMapAPIKey && 
                <>
                    <GoogleMapLatLan mapAPIKey={googleMapAPIKey} setLatLan={setLatLan} />
                    {isTimeoutDone && <GoogleMap latLan={latLan} mapAPIKey={googleMapAPIKey} /> }
                </>
            }
        </>
    );
};

export default GoogleMapWithSearchBar;
