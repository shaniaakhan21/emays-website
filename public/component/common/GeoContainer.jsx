import React, { useState, useEffect } from 'react';
import { getAppInfo } from '../../services/geo';

const GeoContainer = () => {
    const [address, setAddress] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [autocompleteService, setAutocompleteService] = useState(null);
    const [placeService, setPlaceService] = useState(null);

    useEffect(async () => {
        const appInfo = await getAppInfo(); 
        const APIKey = appInfo.googleMapAPIKey;
        console.log('API', appInfo);
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${APIKey}&libraries=places`;
        script.defer = true;
        script.async = true;
        script.onload = () => {
            setAutocompleteService(new window.google.maps.places.AutocompleteService());
            setPlaceService(new google.maps.places.PlacesService(document.createElement('div')));
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const autoCompleteHandler = (event) => {
        setAddress(event.target.value);

        if (autocompleteService && event.target.value) {
            autocompleteService.getPlacePredictions(
                {
                    input: event.target.value,
                    types: ['address']
                }, (predictions) => {
                    setPredictions(predictions);
                }
            );
        } else {
            setPredictions([]);
        }
    };

    const selectPredictionHandler = (prediction) => {
        console.log(prediction);
        setAddress(prediction.description);
        placeService.getDetails({ placeId: prediction['place_id'] }, function (result, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // Use the geometry.location property to get the LatLng object
                const latLng = result.geometry.location;
                console.log(`Latitude: ${latLng.lat()}, Longitude: ${latLng.lng()}`);
            }
        });

        setPredictions([]);
    };

    return (
        <>
            <input type='text' placeholder='Enter address' value={address} onChange={autoCompleteHandler} />
            {predictions.length > 0 && (
                <ul>
                    {predictions.map((prediction) => (
                        <li key={prediction.place_id} onClick={() => selectPredictionHandler(prediction)}>
                            {prediction.description}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default GeoContainer;
