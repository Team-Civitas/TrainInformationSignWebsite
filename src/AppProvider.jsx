import { useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { fetchStations, getTrainDataAtStation } from './components/APIFunctions';

export function AppProvider({ children }) {
    const [trainArray, setTrainArray] = useState([]);
    const [stationList, setStationList] = useState([]);

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'Standard');
    const [selectedStation, setSelectedStation] = useState(() => {
        const stored = localStorage.getItem('selectedStation');
        return stored ? JSON.parse(stored) : { value: 'Cst', label: 'Stockholm C' };
    });

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
        <AppContext.Provider value={{
            theme,
            setTheme,
            selectedStation,
            setSelectedStation,
            trainArray,
            setTrainArray,
            stationList,
            setStationList
        }}>
            {children}
        </AppContext.Provider>

    );
}
