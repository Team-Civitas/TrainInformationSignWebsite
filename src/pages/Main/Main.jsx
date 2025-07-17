import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext.jsx';
import { fetchStations, getTrainDataAtStation } from '../../components/APIFunctions.jsx';
import AcquireTheme from '../../components/AcquireTheme.jsx';

function App() {
  const { theme, selectedStation } = useContext(AppContext);
  const [trainArray, setTrainArray] = useState([]);
  const [stationList, setStationList] = useState([]);

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
