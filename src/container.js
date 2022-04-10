import { connect } from 'react-redux';
// import { Component } from './component';
import App from './App';

const mapStateToProps = state => {
    return {
        favorites: state
        // count: state
    };
};
const mapDispatchToProps = dispatch => {
    return {
        handleAddClick: () => dispatch({ type: 'ADD_FAVORITE' }),
        handleRemoveClick: () => dispatch({ type: 'REMOVE_FAVORITE' })
    }
};
const Component = () =>  <App/>;
export const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
