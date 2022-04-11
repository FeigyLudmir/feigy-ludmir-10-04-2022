import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import './Favorites.css';

function Favorites(props) {
    const favoritesData = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [favoritesWeather, setFavoritesWeather] = useState({});

    useEffect(() => {
        let index = 1;
        let favoritesWeatherHelper = {};
        favoritesData.forEach(location => {
            let url = `http://dataservice.accuweather.com/currentconditions/v1/${location.Key}?apikey=8R7ZXIbbndnXTB4S8gMxj8BNsGs3o34v`;
            fetch(url).then((response) => response.json())
                .then(function (data) {
                    favoritesWeatherHelper[location.Key] = data[0];
                    index++;
                    if (index == favoritesData.length) {
                        setFavoritesWeather(favoritesWeatherHelper);
                    }
                })
                .catch();
        });
    }, []);

    function onSelectFavorite(location) {
        dispatch({ type: 'SET_SELECTED_FAVORITE', location });
        props.showForecast();
    }

    let favoritesItems = favoritesData.map((location, index) => {
        return <Button variant="outline-primary" className="location-details" key={index}
            onClick={() => onSelectFavorite(location)}>
            <div>{location.LocalizedName}</div>
            <div>{favoritesWeather[location.Key]?.WeatherText || 'loading...'}</div>
        </Button>
    })
    return (
        <div className="favorites-wrapper">
            {favoritesItems}
        </div>
    );
}

export default Favorites;