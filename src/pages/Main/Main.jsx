import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import AcquireTheme from '../../components/AcquireTheme.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

function App() {
  const { theme, trainArray } = useContext(AppContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setMenuVisible(true);

      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }

      const timeout = setTimeout(() => {
        setMenuVisible(false);
      }, 1000);

      setHideTimeout(timeout);
    };

    const handleMouseLeave = () => {
      setMenuVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  return (
    <div className="App">
      <Navbar />
      {trainArray.length > 0 && (
        <AcquireTheme
          theme={theme}
          trainArray={trainArray}
        />
      )}
    </div>
  );
}

export default App;
