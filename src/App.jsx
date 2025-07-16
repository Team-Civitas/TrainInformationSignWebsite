import { useState, useEffect } from 'react';
import { fetchStations } from './components/APIFunctions.jsx'; 
import NavBarMeny from './components/SettingsMeny.jsx';
import { themes } from './themes/themes.js';

function AcquireTheme({ theme }) {
  const ThemeComponent = themes[theme] || themes['StandardTheme'];
  return <ThemeComponent />;
}

function App() {
  const [theme, setTheme] = useState('StandardTheme');

  const stations = fetchStations();
  console.log(stations);

  return (
    <div className="App">
      
      <NavBarMeny theme={theme} setTheme={setTheme} />

      
      <AcquireTheme theme={theme} />
    </div>
  );
}

export default App;
