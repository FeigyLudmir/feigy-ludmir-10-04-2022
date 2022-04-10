import { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import './Forecast.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

const APIKey = 'apikey=8R7ZXIbbndnXTB4S8gMxj8BNsGs3o34v'
const basic_url = 'http://dataservice.accuweather.com';
const autocomplete_url = `${basic_url}/locations/v1/cities/autocomplete?${APIKey}`
const weather_url = `${basic_url}/currentconditions/v1`;
const forecast_url = `${basic_url}/forecasts/v1/daily/5day`
function Forecast() {


    const [errorMsg, setErrorMsg] = useState('');
    // const [showToast, setShowError] = useState(true);
    // const toggleShowA = () => setShowError(!showToast);

    // const [selectedLocation, setSelectedLocation] = useState([{ LocalizedName: 'Tel Aviv' }]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    // const [selectedLocation, setSelectedLocation] = useState({ LocalizedName: 'Tel Aviv' });
    const [forecastData, setForecastData] = useState([{ day: 'Sunday', xxx: 38 }, { day: 'Monday', xxx: 40 }, { day: 'Sunday', xxx: 38 }, { day: 'Monday', xxx: 40 }, { day: 'Sunday', xxx: 38 }]);
    const [locationsArr, setLocationsArr] = useState([]);
    const [currentWeather, setCurrentWeather] = useState({});
    // let locationsArr = [{ LocalizedName: 'aaa' }, { LocalizedName: 'bbb' }, { LocalizedName: 'abc' }, { LocalizedName: 'ccc' }];
    // let locationsArr = ['aaa', 'bbb', 'abc', 'ccc'];
    // let forecastData = [{ day: 'Sunday', xxx: 38 }, { day: 'Monday', xxx: 40 }];

    let forecastItems = forecastData.map((location, index) => {
        return <div className="forecast-details" key={index}>
            <div className="forecast-day">{location.day}</div>
            <div className="forecast-weather">{location.xxx}</div>
        </div>
    })
    function locationChange(selected) {
        // debugger;
        // let url = `${autocomplete_url}&q=${selected}&language=en-us`;//
        // fetch(url).then((response) => response.json())
        //     .then(function (data) {
        //         // debugger;
        //         let locations = data.map(item => { return { ...item.AdministrativeArea, Key: item.Key } });
        //         setLocationsArr(locations);
        //     })
        //     .catch((error) => console.log(error));

    }
    function showError(error) {
        // debugger;
        console.log(error);
        setErrorMsg('Server Error, please contact your admin');
    }
    useEffect(() => {
        /*
        [
  {
    "LocalObservationDateTime": "2022-04-10T00:23:00+03:00",
    "EpochTime": 1649539380,
    "WeatherText": "Clear",
    "WeatherIcon": 33,
    "HasPrecipitation": false,
    "PrecipitationType": null,
    "IsDayTime": false,
    "Temperature": {
      "Metric": {
        "Value": 17.2,
        "Unit": "C",
        "UnitType": 17
      },
      "Imperial": {
        "Value": 63,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "MobileLink": "http://www.accuweather.com/en/gr/athens/182536/current-weather/182536?lang=en-us",
    "Link": "http://www.accuweather.com/en/gr/athens/182536/current-weather/182536?lang=en-us"
  }
]*/
        // debugger;
        let key = selectedLocation.length ? selectedLocation[0].Key : 215854; /* Tel Aviv Key */
        let url = `${weather_url}/${key}?${APIKey}`;//&language=en-us&details=false
        // fetch(url).then((response) => response.json())
        //     .then(function (data) {
        //         // debugger;
        //         setCurrentWeather(data[0]);
        //     })
        //     .catch(showError);
        // url += '&metric=true';
        // fetch(url).then((response) => response.json())
        //     .then(function (data) {
        //         // debugger;
        //         setForecastData(data.DailyForecasts);
        //     })
        //     .catch(showError);
    }, [selectedLocation]);
    const mngFavoritesBtnTxt = false ? 'Add to' : 'Remove from';
    
    return (
        <div>
            <div style={{ width: 'fit-content' }}>
                <Typeahead id='selectLocation'
                    onChange={setSelectedLocation}
                    onInputChange={locationChange}
                    options={locationsArr}
                    selected={selectedLocation}
                    labelKey="LocalizedName"
                    placeholder="Choose a state...">
                </Typeahead>
            </div>

            <div className='selected-location-wrapper'>
                <div className='forecast-details'>{selectedLocation.length ? selectedLocation[0].LocalizedName : 'nothing selected'}</div>
                {currentWeather.Temperature ? <div><div>{currentWeather.WeatherText}</div>
                    <div>{currentWeather.Temperature.Metric.Value}</div></div> : ''}
                <Button variant="outline-primary" className="manage-favorites-btn">
                    <i>+</i>{mngFavoritesBtnTxt} favorites
                </Button>
            </div>

            <div className="forecast-wrapper-5d">
                <h3>Next 5 Days Forecast</h3>
                <div className="forecast-wrapper">
                    {forecastItems}
                </div>
            </div>

            <ToastContainer position="top-end" className="p-3">
                <Toast show={errorMsg.length > 0} onClose={() => setErrorMsg('')} delay={3000} autohide bg='danger'>
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