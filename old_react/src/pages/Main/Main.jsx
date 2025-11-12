import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import { AcquireTheme } from '../../components/AcquireTheme.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

function App() {
  const { theme, trainArray, SLTrainArray } = useContext(AppContext);

  return (
    <div className="App">
      <Navbar />
      {trainArray.length > 0 && (
        <AcquireTheme
          theme={theme}
          trainArray={trainArray}
          SLTrainArray={SLTrainArray}
        />
      )}
    </div>
  );
}

export default App;
