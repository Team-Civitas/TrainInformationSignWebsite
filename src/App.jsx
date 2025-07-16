import { useEffect, useState } from 'react';
import { fetchStations, getStationData } from './components/APIFunctions.jsx';
import SettingsMeny from './components/SettingsMeny.jsx';
import { themes } from './themes/themes.js';

function AcquireTheme({ theme, stationArray }) {
  const ThemeComponent = themes[theme] || themes['StandardTheme'];
  return <ThemeComponent stationArray={stationArray} />;
}

function App() {
  const [theme, setTheme] = useState('StandardTheme');
  const [selectedStation, setSelectedStation] = useState('Cst');
  const [stationArray, setStationArray] = useState([]);
  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    async function reloadStation() {
      try {
        const stationData = await getStationData(selectedStation);
        setStationArray(stationData);

      } catch (err) {
        console.error('Failed to fetch stations:', err);
      }
    }

    reloadStation();
  }, [selectedStation]);


  return (
    <div className="App">
      <SettingsMeny theme={theme} setTheme={setTheme} selectedStation={selectedStation} setSelectedStation={setSelectedStation} />
      <AcquireTheme theme={theme} stationArray={stationArray} />
    </div>
  );
}

export default App;
