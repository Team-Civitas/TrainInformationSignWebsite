import { useContext } from 'react';
import Select from 'react-select';
import { themeList } from '../../themes/themes';
import { nameToStationSignature } from '../../components/APIFunctions';
import { AppContext } from '../../AppContext';
import { Link } from 'react-router-dom';

function Settings() {
  const { theme, setTheme, selectedStation, setSelectedStation, stationList } = useContext(AppContext);

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
    <div className="SettingsPage">
      <Link to="/"><p>Back</p></Link>

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
  );
}

export default Settings;
