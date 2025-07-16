import './styles/SettingsMeny.css'
import { themeList } from "../themes/themes";

function SettingsMeny({ theme, setTheme, selectedStation, setSelectedStation }) {
  const changeTheme = (event) => {
    setTheme(event.target.value);
  };

  const setSearchStation = (event) => {
    setSelectedStation(event.target.value);
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
            <input 
              type="text" 
              value={selectedStation}
              onChange={setSearchStation}
            />
        </div>

      </div>
    </div>
  );
  
}

export default SettingsMeny;