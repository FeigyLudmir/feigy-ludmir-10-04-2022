import { Tab, Tabs } from 'react-bootstrap';
import Favorites from './Favorites';
import Forecast from './Forecast';

function App() {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Tabs defaultActiveKey="main-weather" id="uncontrolled-tab" className="mb-3">
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
