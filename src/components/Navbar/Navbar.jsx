import './Navbar.css';
import { themeList } from "../../themes/themes.js";
import Select from 'react-select';
import { nameToStationSignature } from '../APIFunctions.jsx';
import { useContext } from 'react';
import { AppContext } from '../../AppContext.js';

function Navbar() {
  const {
    theme,
    setTheme,
    selectedStation,
    setSelectedStation,
    stationList
  } = useContext(AppContext);

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
    <div className='NavbarWrapper'>
      <div className="Navbar">
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

export default Navbar;
