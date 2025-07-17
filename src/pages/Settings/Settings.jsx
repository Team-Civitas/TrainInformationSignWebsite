import { useState, useEffect } from 'react';
import Select from 'react-select';
import { themeList } from '../../themes/themes.js';
import { nameToStationSignature, fetchStations } from '../../components/APIFunctions.jsx';
import './SettingsMeny.css'

function SettingsPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'Standard');
  const [selectedStation, setSelectedStation] = useState(() => {
    const stored = localStorage.getItem('selectedStation');
    return stored ? JSON.parse(stored) : { value: 'Cst', label: 'Stockholm C' };
  });
  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('selectedStation', JSON.stringify(selectedStation));
  }, [selectedStation]);

  useEffect(() => {
    async function reloadStations() {
      try {
        const stationsData = await fetchStations();
        setStationList(stationsData);
      } catch (err) {
        console.error('Failed to fetch stations:', err);
      }
    }
    reloadStations();
  }, []);

  const stationOptions = Array.isArray(stationList.stationsArray)
    ? stationList.stationsArray.map(station => ({
      value: nameToStationSignature(station.AdvertisedLocationName),
      label: station.AdvertisedLocationName
    }))
    : [];

  const changeTheme = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className='SettingsMenyWrapper'>
      <div className="SettingsMeny">
        <div className="ThemeSelector">
          <label className="ThemeSelectorLabel">Theme: </label>
          <select value={theme} onChange={changeTheme}>
            {themeList.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className='StationSearchMeny'>
          <label>Selected Station: </label>
          <Select
            options={stationOptions}
            value={selectedStation}
            onChange={setSelectedStation}
            placeholder="Välj en Station"
            classNamePrefix="react-select"
          />
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
