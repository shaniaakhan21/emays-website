import React, { useState, useEffect } from 'react';
import { getRetailerData, getSelectedLaunchArea, setServiceCost } from '../../js/util/SessionStorageUtil';
import { getAppInfo, getServiceFee } from '../../services/geo';
import TextBoxCustom from './TextBoxCustom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMessage } from './messageCtx';
import { Search } from '@carbon/icons-react';
// SCSS
import '../../scss/component/common/geoContainer.scss';

const GeoSearchContainer = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    .geo_search {
        display: flex;
        .search-icon {
            height: 40px;
            width: 30px;
            padding-right: 10px;
            background-color: #f4f4f4;
            border-bottom: 1px solid #8d8d8d;
        }
    }
`;

const List = styled.ul`
    li {
        padding-bottom: 10px;
        background-color: #e1e1e1;
        cursor: pointer;
    }
`;

const GeoContainer = ({ updateAddress, updateServiceFee, appData, isDisabled = false }) => {

    const [t] = useTranslation();
    const [address, setAddress] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [autocompleteService, setAutocompleteService] = useState(null);
    const [placeService, setPlaceService] = useState(null);
    const pushAlert = useMessage();
    // Initialize google map API. App Data will be passed by Store App.
    useEffect(() => {
        loadServices();
    }, [appData]); 

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
        } else if (mapsApiLoaded && !autocompleteService) {
            setAutocompleteService(new window.google.maps.places.AutocompleteService());
        } else if (mapsApiLoaded && !placeService) {
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
        setAddress(prediction?.description);
        placeService.getDetails({ placeId: prediction['place_id'] }, function (result, status) {
            const [addOne, addTwo, addThree, addFour] = prediction?.description?.split(', ');
            updateAddress({ addOne: addOne ? addOne : '',
                addTwo: addTwo ? addTwo : '',
                addThree: addThree ? addThree : '',
                addFour: addFour ? addFour : ''
            });
            if (status === google?.maps?.places?.PlacesServiceStatus?.OK) {
                const latLng = result?.geometry?.location;
                // If appData available, it means this is being called from Store app.

                // TODO: later get the exact area passed by the wordpress widget here, But route doesn't use this.
                const launchArea = getSelectedLaunchArea();
                let area = result?.vicinity;
                if (launchArea && launchArea.toLocaleLowerCase() !== area) {
                    /*
                     * PushAlert({
                     *     kind: 'warning',
                     *     title: t('statusMessage.warning'),
                     *     subtitle: t('statusMessage.message.change-location-warning')
                     * });
                     */
                }
                if (!appData) {
                    /*
                     * So if not app data available means, this is being called by e-commerce. Use session storage.
                     * area = getRetailerData()?.retailerArea;
                     */
                }
                getServiceFee(area, latLng?.lat(), latLng?.lng())?.then((data, error) => {
                    const serviceFee = data?.serviceFee;
                    setServiceCost(serviceFee);
                    updateServiceFee(serviceFee);
                }).catch((error) => {
                    setServiceCost(null);
                    updateServiceFee(null);
                    pushAlert({
                        kind: 'error',
                        title: t('statusMessage.error'),
                        subtitle: t('statusMessage.message.change-location-error')
                    });
                });
            }
        });
        setPredictions([]);
    };

    return (
        <GeoSearchContainer>
            <div className='geo_search'>
                <TextBoxCustom 
                    disabled = {isDisabled}
                    placeholderText={t('checkout.book-appointment.searchAddress')}
                    customStyle={{ width: '100%' }}
                    value={address} onChange={autoCompleteHandler}
                /><Search className={'search-icon'}/>
            </div>
            { predictions && predictions?.length > 0 && (
                <List>
                    {predictions?.map((prediction) => (
                        prediction && <li
                            key={prediction?.place_id} onClick={() => selectPredictionHandler(prediction)}>
                            {prediction?.description}
                        </li>
                    ))}
                </List>
            )}
        </GeoSearchContainer>
    );
};

export default GeoContainer;
