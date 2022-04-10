import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import App from './App';
import { Container } from './container';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { store } from './store';
import { Provider } from 'react-redux';


// const App = () => (
//   <Provider store={store}>
//     <Container />
//   </Provider>
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
/*
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */