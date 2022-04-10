// import logo from './logo.svg';
import './App.css';
import { Tab, Tabs } from 'react-bootstrap';
import Favorites from './Favorites';
import Forecast from './Forecast';

// import { useSelector, useDispatch } from 'react-redux'


function App() {
  // const count = useSelector(selectCount)
  // const dispatch = useDispatch()


  return (
    <div className="App">
      <h1>Weather App</h1>
      <Tabs defaultActiveKey="main-weather" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="main-weather" title="Home">
          <Forecast></Forecast>
        </Tab>
        <Tab eventKey="profile" title="Favorites">
          <Favorites></Favorites>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
