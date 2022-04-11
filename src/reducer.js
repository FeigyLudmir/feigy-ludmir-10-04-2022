
function saveFavoritesData(state) {
    localStorage.setItem('favorites_data', JSON.stringify(state.favorites))
    return state;
}
function getFavoritesData() {
    return {
        favorites: JSON.parse(localStorage.getItem('favorites_data')) || [],
        selectedFavorite: { ID: "TA", Key: "215854", LocalizedName: "Tel Aviv" }
    };
}

const reducer = (state = getFavoritesData(), action) => {
    console.log('reducer');
    switch (action.type) {
        case 'ADD_FAVORITE':
            return saveFavoritesData({ ...state, favorites: [...state.favorites, action.location] });
        case 'REMOVE_FAVORITE':
            return saveFavoritesData({ ...state, favorites: state.favorites.filter(location => location.Key !== action.location.Key) });
        case 'SET_SELECTED_FAVORITE':
            return { ...state, selectedFavorite: action.location };
        default:
            return state;
    }
};

export default reducer;