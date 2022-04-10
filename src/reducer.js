
function saveFavoritesData(favorites) {
    localStorage.setItem('favorites_data', JSON.stringify(favorites))
    return favorites;
}
function getFavoritesData() {
    return JSON.parse(localStorage.getItem('favorites_data')) || [];
}

const reducer = (state = getFavoritesData(), action) => {
    console.log('reducer');
    switch (action.type) {
        // case 'SET_FAVORITES':
        //     return getFavoritesData();
        case 'ADD_FAVORITE':
            return saveFavoritesData([...state, action.location]);
        case 'REMOVE_FAVORITE':
            return saveFavoritesData(state.filter(location => location.ID !== action.locationId));
        case 'GET_FAVORITES':
        default:
            return state;
    }
};

export default reducer;