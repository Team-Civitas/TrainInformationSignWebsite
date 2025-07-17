import { Link } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';

function Navbar() {

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
    <div className={`Navbar ${menuVisible ? 'active' : ''}`}>
      <Link to="/Settings"><p>Settings</p></Link>
    </div>
  )
}

export default Navbar;
