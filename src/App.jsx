import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main'
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Settings" element={<Settings />} />
    </Routes>
  );
}

export default App;