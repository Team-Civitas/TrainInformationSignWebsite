import './styles/SettingsMeny.css'
import { themeList } from "../themes/themes";
import Select from 'react-select';
import { nameToStationSignature } from './APIFunctions.jsx';

const options = [
  { value: 'Cst', label: 'Stockholm C' },
  { value: 'Söö', label: 'Söder' }
];

function SettingsMeny({ theme, setTheme, selectedStation, setSelectedStation, stationList }) {

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
          <select
            value={theme}
            onChange={changeTheme}
          >
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

export default SettingsMeny;