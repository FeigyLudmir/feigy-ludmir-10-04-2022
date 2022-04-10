import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import './Favorites.css';
function Favorites() {
    const favoritesData = useSelector((state) => state);
    let favoritesItems = favoritesData.map((location, index) => {
        return <div className="location-details" key={index}>
            <div className="location-name">{location.LocalizedName}</div>
            <div className="location-weather">{location.temp || 'loading...'}</div>
            <div className="weather-description">description</div>
        </div>
    })
    return (
        <div className="favorites-wrapper">
            {favoritesItems}
        </div>
    );
}

export default Favorites;