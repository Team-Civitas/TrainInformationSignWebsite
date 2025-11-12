import { useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { fetchStations, getTrainDataAtStation, fetchSLStations, getSLTrainDataAtStation } from './components/APIFunctions';
import usePersistentState from './components/usePersistentState';

const AppProviderDefaults = {
  language: { value: 'sv', label: 'Svenska 🇸🇪' },
  arrival: false,
  theme: 'Standard',
  selectedStation: { value: 'Cst', label: 'Stockholm C' },
  SLSelectedStation: { value: 'Cst', label: 'Stockholm C' }
};

export function AppProvider({ children }) {
  const [language, setLanguage] = usePersistentState('language', AppProviderDefaults);
  const [showArrivals, setArrival] = usePersistentState('arrival', AppProviderDefaults, v => v === 'true', String);
  const [theme, setTheme] = usePersistentState('theme', AppProviderDefaults);
  const [selectedStation, setSelectedStation] = usePersistentState('selectedStation', AppProviderDefaults);
  const [SLSelectedStation, setSLSelectedStation] = usePersistentState('SLSelectedStation', AppProviderDefaults);

  const [trainArray, setTrainArray] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [SLStationList, setSLStationList] = useState([]);
  const [SLTrainArray, setSLTrainArray] = useState([]);

  useEffect(() => {
    async function reloadStation() {
      try {
        const stationsData = await fetchStations();
        setStationList(stationsData);

        const SLStationsData = await fetchSLStations();
        setSLStationList(SLStationsData);

        const trainsData = await getTrainDataAtStation(selectedStation.value);
        setTrainArray(trainsData);

        const SLTrainData = await getSLTrainDataAtStation(SLSelectedStation.value);
        setSLTrainArray(SLTrainData);
      } catch (err) {
        console.error('Failed to fetch stations:', err);
      }
    }

    reloadStation();
    const interval = setInterval(reloadStation, 600000);
    return () => clearInterval(interval);
  }, [selectedStation, SLSelectedStation]);

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      selectedStation,
      setSelectedStation,
      SLSelectedStation,
      setSLSelectedStation,
      trainArray,
      setTrainArray,
      SLTrainArray,
      setSLTrainArray,
      stationList,
      setStationList,
      SLStationList,
      setSLStationList,
      showArrivals,
      setArrival,
      language,
      setLanguage
    }}>
      {children}
    </AppContext.Provider>
  );
}
