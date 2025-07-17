import { useEffect, useState } from 'react';
import { fetchStations, getTrainDataAtStation } from './components/APIFunctions.jsx';
import SettingsMeny from './components/SettingsMeny.jsx';
import { themes } from './themes/themes.js';

function AcquireTheme({ theme, trainArray }) {
  const ThemeComponent = themes[theme] || themes['Standard'];
  return <ThemeComponent trainArray={trainArray} />;
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'Standard';
  });

  const [selectedStation, setSelectedStation] = useState(() => {
    const stored = localStorage.getItem('selectedStation');
    return stored ? JSON.parse(stored) : { value: 'Cst', label: 'Stockholm C' };
  });

  const [trainArray, setTrainArray] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('selectedStation', JSON.stringify(selectedStation));
  }, [selectedStation]);

  useEffect(() => {
    const handleMouseMove = () => {
      setMenuVisible(true);

      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }

      const timeout = setTimeout(() => {
        setMenuVisible(false);
      }, 1000);

      setHideTimeout(timeout);
    };

    const handleMouseLeave = () => {
      setMenuVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

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
      <div className={`SettingsMenyWrapper ${menuVisible ? 'active' : ''}`}>
        <SettingsMeny
          theme={theme}
          setTheme={setTheme}
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          stationList={stationList}
        />
      </div>
      {trainArray.length > 0 && (
        <AcquireTheme
          theme={theme}
          trainArray={trainArray}
        />
      )}
    </div>
  );
}


export default App;
