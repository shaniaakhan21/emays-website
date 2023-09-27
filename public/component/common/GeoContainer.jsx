import React, { useState, useEffect } from 'react';
import { getRetailerData, setServiceCost } from '../../js/util/SessionStorageUtil';
import { getAppInfo, getServiceFee } from '../../services/geo';
import TextBoxCustom from './TextBoxCustom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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

const GeoContainer = ({ updateAddress, updateServiceFee, appData }) => {

    const [t] = useTranslation();
    const [address, setAddress] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [autocompleteService, setAutocompleteService] = useState(null);
    const [placeService, setPlaceService] = useState(null);
    // Initialize google map API
    useEffect(() => {
        (async () => {
            let script;
            const scripts = document.getElementsByTagName('script');
            const mapsApiLoaded = Array.from(scripts).some(
                (script) => script.src.includes('https://maps.googleapis.com/maps/api/js?key')
            );
            if (!mapsApiLoaded) {
                let appInfo;
                if (!appData) {
                    appInfo = await getAppInfo();
                } else {
                    appInfo = {
                        googleMapAPIKey: appData
                    };
                }
                script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${appInfo.googleMapAPIKey}&libraries=places`;
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
        })().catch(error => {
            return error;
        });
    }, [appData]);

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
            const [addOne] = prediction.description.split(', ');
            updateAddress({ addOne: addOne ? addOne : '' });
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const latLng = result.geometry.location;
                const area = getRetailerData().retailerArea;
                getServiceFee(area, latLng.lat(), latLng.lng()).then(data => {
                    const serviceFee = data.serviceFee;
                    setServiceCost(serviceFee);
                    updateServiceFee(serviceFee);
                });
            }
        });
        setPredictions([]);
    };

    return (
        <GeoSearchContainer>
            <TextBoxCustom 
                placeholderText={t('checkout.book-appointment.searchAddress')}
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
