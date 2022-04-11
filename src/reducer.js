
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
        case 'ADD_FAVORITE':
            return saveFavoritesData([...state, action.location]);
        case 'REMOVE_FAVORITE':
            return saveFavoritesData(state.filter(location => location.Key !== action.location.Key));
        case 'SET_SELECTED_FAVORITE':
            return state.map(item => { return { ...item, selected: item.Key === action.Key } });
        default:
            return state;
    }
};

export default reducer;