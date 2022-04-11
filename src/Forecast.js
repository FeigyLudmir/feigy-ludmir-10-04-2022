import './Forecast.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const APIKey = 'apikey=8R7ZXIbbndnXTB4S8gMxj8BNsGs3o34v'
const basic_url = 'http://dataservice.accuweather.commm';
const autocomplete_url = `${basic_url}/locations/v1/cities/autocomplete?${APIKey}`
const weather_url = `${basic_url}/currentconditions/v1`;
const forecast_url = `${basic_url}/forecasts/v1/daily/5day`
function Forecast() {
    const [errorMsg, setErrorMsg] = useState('');
    const [forecastData, setForecastData] = useState([]);
    const [locationsArr, setLocationsArr] = useState([]);
    const [currentWeather, setCurrentWeather] = useState({});
    const [favoritesBtnTxt, setFavBtnText] = useState('Add to');
    const [actionType, setActionType] = useState('ADD_FAVORITE');
    const defaultLocation = useSelector((state) => state.selectedFavorite);
    const favoritesData = useSelector((state) => state.favorites);
    const [selectedLocations, setSelectedLocations] = useState([defaultLocation]);
    const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

    function locationChange(selected) {
        let url = `${autocomplete_url}&q=${selected}&language=en-us`;//
        fetch(url).then((response) => response.json())
            .then(function (data) {
                let locations = data.map(item => { return { ...item.AdministrativeArea, Key: item.Key } });
                setLocationsArr(locations);
            })
            .catch(showError);
        // let data = [
        //     {
        //         "Version": 1,
        //         "Key": "215854",
        //         "Type": "City",
        //         "Rank": 31,
        //         "LocalizedName": "Tel Aviv",
        //         "Country": {
        //             "ID": "IL",
        //             "LocalizedName": "Israel"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "TA",
        //             "LocalizedName": "Tel Aviv"
        //         }
        //     },
        //     {
        //         "Version": 1,
        //         "Key": "3431644",
        //         "Type": "City",
        //         "Rank": 45,
        //         "LocalizedName": "Telanaipura",
        //         "Country": {
        //             "ID": "ID",
        //             "LocalizedName": "Indonesia"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "JA",
        //             "LocalizedName": "Jambi"
        //         }
        //     },
        //     {
        //         "Version": 1,
        //         "Key": "300558",
        //         "Type": "City",
        //         "Rank": 45,
        //         "LocalizedName": "Telok Blangah New Town",
        //         "Country": {
        //             "ID": "SG",
        //             "LocalizedName": "Singapore"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "05",
        //             "LocalizedName": "South West"
        //         }
        //     },
        //     {
        //         "Version": 1,
        //         "Key": "325876",
        //         "Type": "City",
        //         "Rank": 51,
        //         "LocalizedName": "Telford",
        //         "Country": {
        //             "ID": "GB",
        //             "LocalizedName": "United Kingdom"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "TFW",
        //             "LocalizedName": "Telford and Wrekin"
        //         }
        //     },
        //     {
        //         "Version": 1,
        //         "Key": "169072",
        //         "Type": "City",
        //         "Rank": 51,
        //         "LocalizedName": "Telavi",
        //         "Country": {
        //             "ID": "GE",
        //             "LocalizedName": "Georgia"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "KA",
        //             "LocalizedName": "Kakheti"
        //         }
        //     },
        //     {
        //         "Version": 1,
        //         "Key": "230611",
        //         "Type": "City",
        //         "Rank": 51,
        //         "LocalizedName": "Telsiai",
        //         "Country": {
        //             "ID": "LT",
        //             "LocalizedName": "Lithuania"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "TE",
        //             "LocalizedName": "Telšiai"
        //         }
        //     },
        //     {
        //         "Version": 1,
        //         "Key": "2723742",
        //         "Type": "City",
        //         "Rank": 55,
        //         "LocalizedName": "Telégrafo",
        //         "Country": {
        //             "ID": "BR",
        //             "LocalizedName": "Brazil"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "PA",
        //             "LocalizedName": "Pará"
        //         }
        //     },
        //     {
        //         "Version": 1,
        //         "Key": "186933",
        //         "Type": "City",
        //         "Rank": 55,
        //         "LocalizedName": "Tela",
        //         "Country": {
        //             "ID": "HN",
        //             "LocalizedName": "Honduras"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "AT",
        //             "LocalizedName": "Atlántida"
        //         }
        //     },
        //     {
        //         "Version": 1,
        //         "Key": "3453754",
        //         "Type": "City",
        //         "Rank": 55,
        //         "LocalizedName": "Telaga Asih",
        //         "Country": {
        //             "ID": "ID",
        //             "LocalizedName": "Indonesia"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "JB",
        //             "LocalizedName": "West Java"
        //         }
        //     },
        //     {
        //         "Version": 1,
        //         "Key": "3453755",
        //         "Type": "City",
        //         "Rank": 55,
        //         "LocalizedName": "Telagamurni",
        //         "Country": {
        //             "ID": "ID",
        //             "LocalizedName": "Indonesia"
        //         },
        //         "AdministrativeArea": {
        //             "ID": "JB",
        //             "LocalizedName": "West Java"
        //         }
        //     }
        // ];
        // let locations = data.map(item => { return { ...item.AdministrativeArea, Key: item.Key } });
        // setLocationsArr(locations);
    }

    function showError(error) {
        console.log(error);
        setErrorMsg('Server Error, please contact your admin');
    }

    useEffect(() => {
        let key = selectedLocation.Key;
        let url = `${weather_url}/${key}?${APIKey}`;//&language=en-us&details=false
        fetch(url).then((response) => response.json())
            .then(function (data) {
                setCurrentWeather(data[0]);
            })
            .catch(showError);
        // setCurrentWeather([
        //     {
        //         "LocalObservationDateTime": "2022-04-11T00:58:00+03:00",
        //         "EpochTime": 1649627880,
        //         "WeatherText": "Partly cloudy",
        //         "WeatherIcon": 35,
        //         "HasPrecipitation": false,
        //         "PrecipitationType": null,
        //         "IsDayTime": false,
        //         "Temperature": {
        //             "Metric": {
        //                 "Value": 17.8,
        //                 "Unit": "C",
        //                 "UnitType": 17
        //             },
        //             "Imperial": {
        //                 "Value": 64,
        //                 "Unit": "F",
        //                 "UnitType": 18
        //             }
        //         },
        //         "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        //         "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
        //     }
        // ][0]);
        let url_5d = `${forecast_url}/${key}?${APIKey}&metric=true`;
        fetch(url_5d).then((response) => response.json())
            .then(function (data) {
                let forecastData = data.DailyForecasts.map((item) => {
                    return {
                        temp: `${item.Temperature.Minimum.Value} - ${item.Temperature.Maximum.Value}`,
                        day: new Date(item.Date).toLocaleDateString('en-us', { weekday: 'long' })
                    }
                });
                setForecastData(forecastData);
            })
            .catch(showError);
        // let data = {
        //     "Headline": {
        //         "EffectiveDate": "2022-04-12T08:00:00+03:00",
        //         "EffectiveEpochDate": 1649739600,
        //         "Severity": 7,
        //         "Text": "Cool Tuesday",
        //         "Category": "cold",
        //         "EndDate": "2022-04-12T20:00:00+03:00",
        //         "EndEpochDate": 1649782800,
        //         "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us",
        //         "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
        //     },
        //     "DailyForecasts": [
        //         {
        //             "Date": "2022-04-10T07:00:00+03:00",
        //             "EpochDate": 1649563200,
        //             "Temperature": {
        //                 "Minimum": {
        //                     "Value": 13.2,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 },
        //                 "Maximum": {
        //                     "Value": 21.5,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 }
        //             },
        //             "Day": {
        //                 "Icon": 1,
        //                 "IconPhrase": "Sunny",
        //                 "HasPrecipitation": false
        //             },
        //             "Night": {
        //                 "Icon": 38,
        //                 "IconPhrase": "Mostly cloudy",
        //                 "HasPrecipitation": false
        //             },
        //             "Sources": [
        //                 "AccuWeather"
        //             ],
        //             "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us",
        //             "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
        //         },
        //         {
        //             "Date": "2022-04-11T07:00:00+03:00",
        //             "EpochDate": 1649649600,
        //             "Temperature": {
        //                 "Minimum": {
        //                     "Value": 17.6,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 },
        //                 "Maximum": {
        //                     "Value": 20.8,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 }
        //             },
        //             "Day": {
        //                 "Icon": 2,
        //                 "IconPhrase": "Mostly sunny",
        //                 "HasPrecipitation": false
        //             },
        //             "Night": {
        //                 "Icon": 38,
        //                 "IconPhrase": "Mostly cloudy",
        //                 "HasPrecipitation": false
        //             },
        //             "Sources": [
        //                 "AccuWeather"
        //             ],
        //             "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
        //             "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
        //         },
        //         {
        //             "Date": "2022-04-12T07:00:00+03:00",
        //             "EpochDate": 1649736000,
        //             "Temperature": {
        //                 "Minimum": {
        //                     "Value": 14.2,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 },
        //                 "Maximum": {
        //                     "Value": 18.3,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 }
        //             },
        //             "Day": {
        //                 "Icon": 6,
        //                 "IconPhrase": "Mostly cloudy",
        //                 "HasPrecipitation": false
        //             },
        //             "Night": {
        //                 "Icon": 35,
        //                 "IconPhrase": "Partly cloudy",
        //                 "HasPrecipitation": false
        //             },
        //             "Sources": [
        //                 "AccuWeather"
        //             ],
        //             "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
        //             "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
        //         },
        //         {
        //             "Date": "2022-04-13T07:00:00+03:00",
        //             "EpochDate": 1649822400,
        //             "Temperature": {
        //                 "Minimum": {
        //                     "Value": 14.3,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 },
        //                 "Maximum": {
        //                     "Value": 18.5,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 }
        //             },
        //             "Day": {
        //                 "Icon": 1,
        //                 "IconPhrase": "Sunny",
        //                 "HasPrecipitation": false
        //             },
        //             "Night": {
        //                 "Icon": 34,
        //                 "IconPhrase": "Mostly clear",
        //                 "HasPrecipitation": false
        //             },
        //             "Sources": [
        //                 "AccuWeather"
        //             ],
        //             "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
        //             "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
        //         },
        //         {
        //             "Date": "2022-04-14T07:00:00+03:00",
        //             "EpochDate": 1649908800,
        //             "Temperature": {
        //                 "Minimum": {
        //                     "Value": 13.6,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 },
        //                 "Maximum": {
        //                     "Value": 20.6,
        //                     "Unit": "C",
        //                     "UnitType": 17
        //                 }
        //             },
        //             "Day": {
        //                 "Icon": 1,
        //                 "IconPhrase": "Sunny",
        //                 "HasPrecipitation": false
        //             },
        //             "Night": {
        //                 "Icon": 33,
        //                 "IconPhrase": "Clear",
        //                 "HasPrecipitation": false
        //             },
        //             "Sources": [
        //                 "AccuWeather"
        //             ],
        //             "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
        //             "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
        //         }
        //     ]
        // };
        // let forecastData = data.DailyForecasts.map((item) => {
        //     return {
        //         temp: `${item.Temperature.Minimum.Value} - ${item.Temperature.Maximum.Value}`,
        //         day: new Date(item.Date).toLocaleDateString('en-us', { weekday: 'long' })
        //     }
        // });
        // setForecastData(forecastData);
    }, [selectedLocation]);

    function setFavBtn() {
        if (favoritesData?.find((item) => item.Key === selectedLocation.Key)) {
            setFavBtnText('Remove From');
            setActionType('REMOVE_FAVORITE');
        }
        else {
            setFavBtnText('Add To');
            setActionType('ADD_FAVORITE');
        }
    }
    useEffect(() => {
        setFavBtn();
    }, [favoritesData, selectedLocation]);
    useEffect(() => {
        setSelectedLocations([defaultLocation]);
        setSelectedLocation(defaultLocation);
    }, [defaultLocation]);
    // useEffect(() => {
    //     if (favoritesData)
    //         setSelectedLocation(favoritesData.find(item => item.selected));
    // }, [favoritesData]);
    useEffect(() => {
        setFavBtn();
    }, []);

    const dispatch = useDispatch();

    let forecastItems = forecastData.map((item, index) => {
        return <div className="forecast-details" key={index}>
            <div className="forecast-title">{item.day}</div>
            <div className="forecast-weather">{item.temp}</div>
        </div>
    })
    return (
        <div>
            <div style={{ width: 'fit-content' }}>
                <Typeahead id='selectLocation'
                    onChange={(selected) => {
                        debugger;
                        setSelectedLocations(selected)
                        if (selected.length) {
                            setSelectedLocation(selected[0]);
                        }
                    }}
                    onInputChange={locationChange}
                    options={locationsArr}
                    selected={selectedLocations}
                    labelKey="LocalizedName"
                    placeholder="Choose a state..."
                    onKeyDown={(e) => { if (!/[a-z]/i.test(e.key)) { e.preventDefault(); } }}>
                </Typeahead>
            </div>

            <div className='selected-location-wrapper'>
                <div className='forecast-details'>
                    {/* <span className='forecast-title'>{selectedLocation.length ? selectedLocation[0].LocalizedName : 'Tel Aviv'}</span> */}
                    <span className='forecast-title'>{selectedLocation.LocalizedName}</span>
                    {currentWeather.Temperature ? <div><div>{currentWeather.WeatherText}</div>
                        <div>{currentWeather.Temperature.Metric.Value}</div></div> : ''}
                </div>
                <Button variant="outline-primary" className="manage-favorites-btn"
                    onClick={() => dispatch({ type: actionType, location: selectedLocation })}>
                    <i>+</i>{favoritesBtnTxt} favorites
                </Button>
            </div>

            <div className="forecast-wrapper-5d">
                <h3>Next 5 Days Forecast</h3>
                <div className="forecast-wrapper">
                    {forecastItems}
                </div>
            </div>

            <ToastContainer position="top-end" className="p-3">
                <Toast show={errorMsg.length > 0} onClose={() => setErrorMsg('')} delay={5000} autohide bg='danger'>
                    <Toast.Header>
                        <strong className="me-auto">Warning</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMsg}</Toast.Body>
                </Toast>
            </ToastContainer>

        </div>
    );
}

export default Forecast;