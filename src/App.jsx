import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main'
import Settings from './pages/Settings/Settings';
import About from './pages/About/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/About" element={<About />} />
    </Routes>
  );
}

export default App;