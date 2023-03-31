import React, { useState, useEffect } from 'react';
import { getRetailerData } from '../../js/util/SessionStorageUtil';
import { getAppInfo, getServiceFee } from '../../services/geo';
import TextBoxCustom from './TextBoxCustom';
import styled from 'styled-components';

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

const GeoContainer = ({ updateAddress }) => {
    const [address, setAddress] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [autocompleteService, setAutocompleteService] = useState(null);
    const [placeService, setPlaceService] = useState(null);
    // Initialize google map API
    useEffect(() => {
        let appInfo;
        (async () => {
            appInfo = await getAppInfo();
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${appInfo.googleMapAPIKey}&libraries=places`;
            script.defer = true;
            script.async = true;
            script.onload = () => {
                setAutocompleteService(new window.google.maps.places.AutocompleteService());
                setPlaceService(new google.maps.places.PlacesService(document.createElement('div')));
            };
            document.head.appendChild(script);
        })().catch(error => {
            return error;
        });
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
        setAddress(prediction.description);
        placeService.getDetails({ placeId: prediction['place_id'] }, function (result, status) {
            const [addOne, addTwo, addThree, addFour] = prediction.description.split(', ');
            updateAddress({ addOne: addOne ? addOne : '',
                addTwo: addTwo ? addTwo : '', addThree: addThree ? addThree : '',
                addFour: addFour ? addFour : '' });
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const latLng = result.geometry.location;
                const area = getRetailerData().retailerArea;
                getServiceFee(area, latLng.lat(), latLng.lng()).then(data => {
                    // Set service fee
                });
            }
        });
        setPredictions([]);
    };

    return (
        <GeoSearchContainer>
            <TextBoxCustom 
                placeholder='Please try to search your address here'
                customStyle={{ width: '100%' }}
                value={address} onChange={autoCompleteHandler}
            />
            {predictions.length > 0 && (
                <List>
                    {predictions.map((prediction) => (
                        <li
                            key={prediction.place_id} onClick={() => selectPredictionHandler(prediction)}>
                            {prediction.description}
                        </li>
                    ))}
                </List>
            )}
        </GeoSearchContainer>
    );
};

export default GeoContainer;
