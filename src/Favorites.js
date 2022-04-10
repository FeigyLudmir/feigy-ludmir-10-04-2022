import './Favorites.css';
function Favorites() {
    let favoritesData = [{name: 'Tel-Aviv', xxx: 38}, {name: 'Tel-Aviv-Yafo', xxx: 40}];

    let favoritesItems = favoritesData.map((location, index) => {
        return <div className="location-details" key={index}>
            <div className="location-name">{location.name}</div>
            <div className="location-weather">{location.xxx}</div>
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