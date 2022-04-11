import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import './Favorites.css';

function Favorites(props) {
    const favoritesData = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [favoritesWeather, setFavoritesWeather] = useState({});

    useEffect(() => {
        favoritesData.forEach(location => {
            let url = `http://dataservice.accuweather.com/currentconditions/v1/${location.Key}?${APIKey}`;//&language=en-us&details=false
            fetch(url).then((response) => response.json())
                .then(function (data) {
                    setFavoritesWeather({...favoritesWeather, [location.Key]: data[0]});
                })
                .catch(showError);
        });
    }, []);

    function onSelectFavorite(location) {
        dispatch({ type: 'SET_SELECTED_FAVORITE', location });
        props.showForecast();
    }

    let favoritesItems = favoritesData.map((location, index) => {
        return <Button variant="outline-primary" className="location-details" key={index}
            onClick={() => onSelectFavorite(location)}>
            <div className="location-name">{location.LocalizedName}</div>
            <div className="location-weather">{favoritesWeather[location.Key] || 'loading...'}</div>
        </Button>
    })
    return (
        <div className="favorites-wrapper">
            {favoritesItems}
        </div>
    );
}

export default Favorites;