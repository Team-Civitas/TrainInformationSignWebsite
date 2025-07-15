import './styles/SettingsMeny.css'
import { themeList } from "../themes/themes";

function NavBarMeny({ theme, setTheme }) {
  const changeTheme = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className='NavBarMenyWrapper'>
      <div className="NavBarMeny">
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
      </div>
    </div>
  );
  
}

export default NavBarMeny;