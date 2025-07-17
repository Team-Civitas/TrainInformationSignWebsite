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
        label: station.AdvertisedLocationName,
      }))
    : [];

  const themeOptions = themeList.map(t => ({
    value: t,
    label: t,
  }));

  return (
    <div className="SettingsPage">
      <Link to="/"><p>Back</p></Link>

      <div className="ThemeSelector">
        <label className="ThemeSelectorLabel">Theme: </label>
        <Select
          options={themeOptions}
          value={themeOptions.find(opt => opt.value === theme)}
          onChange={(opt) => setTheme(opt.value)}
          placeholder="Välj ett Tema"
          classNamePrefix="react-select"
        />
      </div>

      <div className="StationSearchMeny">
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
