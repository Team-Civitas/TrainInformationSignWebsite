import { themeList } from "../themes/themes";

function NavBarMeny({ theme, setTheme }) {
  const changeTheme = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="ThemeSelector">
      <div style={{ minWidth: '120px' }}>
        <label htmlFor="ThemeSelector" style={{ display: 'flex', marginBottom: '0.5rem' }}>
          Theme
        </label>
        <select
          id="ThemeSelector"
          value={theme}
          onChange={changeTheme}
          style={{ padding: '0.5rem' }}
        >
          {themeList.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default NavBarMeny;