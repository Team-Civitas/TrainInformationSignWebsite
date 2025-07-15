import React, { useState, useEffect } from 'react';
import StandardTheme from './themes/StandardTheme.jsx';
import Theme2 from './themes/2.jsx';
import { fetchStations } from './components/APIFunctions.jsx'; 
import NavBarMeny from './components/NavbarMeny.jsx';

function AcquireTheme({ theme }) {
  switch(theme) {
    case "2":
      return <Theme2 />;
    default:
      return <StandardTheme />;
  }
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
    <div className="App">
      <NavBarMeny theme={theme} setTheme={setTheme} />
      <AcquireTheme theme={theme} />
    </div>
  );
}

export default App;
