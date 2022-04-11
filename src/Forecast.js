import './Forecast.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const APIKey = 'apikey=8R7ZXIbbndnXTB4S8gMxj8BNsGs3o34v'
const basic_url = 'http://dataservice.accuweather.com';
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