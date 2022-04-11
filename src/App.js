import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Favorites from './Favorites';
import Forecast from './Forecast';

function App() {
  const [tabKey, setTabKey] = useState('home');
  const selectHomeTab = () => {
    setTabKey('home');
  };
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab" className="mb-3"
        activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
        <Tab eventKey="home" title="Home">
          <Forecast></Forecast>
        </Tab>
        <Tab eventKey="favorites" title="Favorites">
          <Favorites showForecast={selectHomeTab}></Favorites>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
