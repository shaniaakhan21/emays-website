import React, { useState, useEffect } from 'react';
import TextBoxCustom from './TextBoxCustom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getAddressSearch } from '../dashboard/redux/thunk/addressSearchThunk';

const GeoSearchContainer = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
`;

const List = styled.ul`
    li {
        padding-bottom: 10px;
        background-color: #e1e1e1;
        cursor: pointer;
    }
`;

const GoogleMapLatLan = ({ setLatLan, mapAPIKey }) => {

    const [t] = useTranslation();
    const [address, setAddress] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [autocompleteService, setAutocompleteService] = useState(null);
    const [placeService, setPlaceService] = useState(null);
    const dispatch = useDispatch();
    // Initialize google map API. App Data will be passed by Store App.
    useEffect(() => {
        loadServices();
    }, [mapAPIKey]); 

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        let script;
        const scripts = document.getElementsByTagName('script');
        const mapsApiLoaded = Array.from(scripts).some(
            (script) => script.src.includes('https://maps.googleapis.com/maps/api/js?key')
        );
        if (!mapsApiLoaded) {
            script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${mapAPIKey}&libraries=places`;
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
        } 
        if (mapsApiLoaded && !autocompleteService) {
            setAutocompleteService(new window.google.maps.places.AutocompleteService());
        } 
        if (mapsApiLoaded && !placeService) {
            setPlaceService(new google.maps.places.PlacesService(document.createElement('div')));
        }
        
    };

    const autoCompleteHandler = (event) => {
        setAddress(event?.target?.value);
        if (autocompleteService && event?.target?.value) {
            autocompleteService?.getPlacePredictions(
                {
                    input: event?.target?.value,
                    types: ['address']
                }, (predictions) => {
                    setPredictions(predictions);
                }
            );
        } else {
            setPredictions(['']);
        }
    };

    const selectPredictionHandler = (prediction) => {
        const addressLines = prediction.description.split(',');
        const reversedAddressLines = addressLines.reverse();
        const [country, city, number, street] = reversedAddressLines;
        dispatch(getAddressSearch({ country, city, number, street }));
        setAddress(prediction?.description);
        placeService.getDetails({ placeId: prediction['place_id'] }, function (result, status) {
            const [addOne] = prediction?.description?.split(', ');
            if (status === google?.maps?.places?.PlacesServiceStatus?.OK) {
                const latLng = result?.geometry?.location;
                setLatLan({ lat: latLng.lat(), lan: latLng.lng() });
            }
        });
        setPredictions([]);
    };

    return (
        <GeoSearchContainer >
            <TextBoxCustom 
                placeholderText={'Search address'}
                customStyle={{ width: '100%' }}
                value={address} onChange={autoCompleteHandler}
            />
            { predictions && predictions?.length > 0 && (
                <List>
                    {predictions?.map((prediction) => (
                        <li
                            key={prediction?.place_id} onClick={() => selectPredictionHandler(prediction)}>
                            {prediction?.description}
                        </li>
                    ))}
                </List>
            )}
        </GeoSearchContainer>
    );
};

export default GoogleMapLatLan;
