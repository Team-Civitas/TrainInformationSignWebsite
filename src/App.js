import React, { useState } from 'react';
import StandardTheme from './themes/StandardTheme.js';
import Theme2 from './themes/2.js';
import { fetchStations } from './components/APIFunctions.js'; 
import NavBarMeny from './components/NavbarMeny.js';

function AcquireTheme({ theme }) {
  switch(theme) {
    case "2":
      return (<Theme2 />)
    default:
      return (<StandardTheme />)

  }
}

function App() {
  const [theme, setTheme] = useState('StandardTheme');

    React.useEffect(() => {
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
          <AcquireTheme theme={theme}/>
        </div>
    );
}

export default App ;