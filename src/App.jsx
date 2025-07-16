import { useEffect, useState } from 'react';
import { fetchStations, getTrainDataAtStation, fetchTrainAnnouncements } from './components/APIFunctions.jsx';
import SettingsMeny from './components/SettingsMeny.jsx';
import { themes } from './themes/themes.js';

function AcquireTheme({ theme, trainArray }) {
  const ThemeComponent = themes[theme] || themes['StandardTheme'];
  return <ThemeComponent trainArray={trainArray} />;
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'StandardTheme';
  });

  const [selectedStation, setSelectedStation] = useState(() => {
    const stored = localStorage.getItem('selectedStation');
    return stored ? JSON.parse(stored) : { value: 'Cst', label: 'Stockholm C' };
  });

  const [trainArray, setTrainArray] = useState([]);
  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('selectedStation', JSON.stringify(selectedStation));
  }, [selectedStation]);

  useEffect(() => {
    async function reloadStation() {
      try {
        const stationsData = await fetchStations();
        setStationList(stationsData);

        const trainsData = await getTrainDataAtStation(selectedStation.value);
        setTrainArray(trainsData);
      } catch (err) {
        console.error('Failed to fetch stations:', err);
      }
    }

    reloadStation();
    const interval = setInterval(reloadStation, 600000);
    return () => clearInterval(interval);
  }, [selectedStation]);

  return (
    <div className="App">
      <SettingsMeny
        theme={theme}
        setTheme={setTheme}
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        stationList={stationList}
      />
      <AcquireTheme
        theme={theme}
        trainArray={trainArray}
      />
    </div>
  );
}


export default App;
