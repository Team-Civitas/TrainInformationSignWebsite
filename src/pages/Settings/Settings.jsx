import { useContext } from 'react';
import Select from 'react-select';
import { themeList } from '../../themes/themes';
import { nameToStationSignature } from '../../components/APIFunctions';
import { AppContext } from '../../AppContext';
import { Link } from 'react-router-dom';
import './Setting.css'

function Settings() {
  const { theme, setTheme, selectedStation, setSelectedStation, stationList, showArrivals, setArrival } = useContext(AppContext);

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



  function setArrivalButton() {
    setArrival(true)
  }

  function setDepartureButton() {
    setArrival(false)
  }

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

      <div>
        <button
          onClick={setArrivalButton}
          className={`ArrivalButton ${showArrivals ? 'activeButton' : ''}`}
        >
          Ankomst
        </button>
        <button
          onClick={setDepartureButton}
          className={`DepartureButton ${!showArrivals ? 'activeButton' : ''}`}
        >
          Avgång
        </button>

      </div>

    </div>
  );
}

export default Settings;
