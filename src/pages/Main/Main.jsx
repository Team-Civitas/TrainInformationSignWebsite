import './MainTheme.css';
import { useContext } from 'react';
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

      {trainArray.length == 0 && (
        <p className='NoData'>Getting train data, please wait</p>
      )}
    </div>
  );
}

export default App;
