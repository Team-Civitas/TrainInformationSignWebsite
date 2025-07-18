import { Link } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState, useContext } from 'react';
import { translations } from '../../languages/languages';
import { AppContext } from '../../AppContext';

function Navbar({ className, style }) {
  const { language } = useContext(AppContext)
  const t = translations[language.value]

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
      }, 2000);

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
    <div className="NavbarContainer">
      <div className={`Navbar ${menuVisible ? 'active' : ''} ${className}`} style={style} >
        <Link to="/"><p>{t.home}</p></Link>
        <Link to="/Settings"><p>{t.settings}</p></Link>
        <Link to="/About"><p>{t.about}</p></Link>
      </div>
    </div>
  )
}

export default Navbar;
