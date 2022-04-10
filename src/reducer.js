
function saveFavoritesData(favorites) {
    localStorage.setItem('favorites_data', JSON.stringify(favorites))
    return favorites;
}
function getFavoritesData() {
    return JSON.parse(localStorage.getItem('favorites_data'));
}

const reducer = (state = [], action) => {
    console.log('reducer');
    switch (action.type) {
        case 'GET_FAVORITE':
            return getFavoritesData();
        case 'ADD_FAVORITE':
            let favorites1 = [...state, action.location]; //state.arr.concat(action.newItem)
            return saveFavoritesData(favorites1);
        case 'REMOVE_FAVORITE':
            let favorites2 = state.filter(location => location.ID != action.locationId);
            return saveFavoritesData(favorites2);
        default:
            return state;
    }
};

export default reducer;