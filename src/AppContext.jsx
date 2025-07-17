import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'Standard');
  const [selectedStation, setSelectedStation] = useState(() => {
    const stored = localStorage.getItem('selectedStation');
    return stored ? JSON.parse(stored) : { value: 'Cst', label: 'Stockholm C' };
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('selectedStation', JSON.stringify(selectedStation));
  }, [selectedStation]);

  return (
    <AppContext.Provider value={{ theme, setTheme, selectedStation, setSelectedStation }}>
      {children}
    </AppContext.Provider>
  );
}
