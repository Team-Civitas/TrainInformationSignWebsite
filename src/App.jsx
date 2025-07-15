import React, { useState, useEffect } from 'react';
import { fetchStations } from './components/APIFunctions.jsx'; 
import NavBarMeny from './components/NavbarMeny.jsx';
import { themes } from './themes/themes.js';

function AcquireTheme({ theme }) {
  const ThemeComponent = themes[theme] || themes['StandardTheme'];
  return <ThemeComponent />;
}

function App() {
  const [theme, setTheme] = useState('StandardTheme');

  useEffect(() => {
    async function loadStations() {
      try {
        const stations = await fetchStations();
        console.log(stations);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    }
    loadStations();
  }, []);

  return (
    <div class="App">
      <NavBarMeny theme={theme} setTheme={setTheme} />
      <AcquireTheme theme={theme} />
    </div>
  );
}

export default App;
