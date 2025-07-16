import { useEffect, useState } from 'react';
import { fetchStations, getTrainDataAtStation, fetchTrainAnnouncements } from './components/APIFunctions.jsx';
import SettingsMeny from './components/SettingsMeny.jsx';
import { themes } from './themes/themes.js';

function AcquireTheme({ theme, trainArray }) {
  const ThemeComponent = themes[theme] || themes['StandardTheme'];
  return <ThemeComponent trainArray={trainArray}/>;
}

function App() {
  const [theme, setTheme] = useState('StandardTheme');
  const [selectedStation, setSelectedStation] = useState('Cst');
  const [trainArray, setTrainArray] = useState([]);
  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    async function reloadStation() {
      try {
        console.log('Fetching stations...');
        const stationsData = await fetchStations();
        setStationList(stationsData);

        const trainsData = await getTrainDataAtStation(selectedStation);
        setTrainArray(trainsData);
        
      } catch (err) {
        console.error('Failed to fetch stations:', err);
      }
    }

    reloadStation();
  }, [selectedStation]);

  return (
    <div className="App">
      <SettingsMeny theme={theme} setTheme={setTheme} selectedStation={selectedStation} setSelectedStation={setSelectedStation} />
      <AcquireTheme theme={theme} trainArray={trainArray} />
    </div>
  );
}

export default App;
