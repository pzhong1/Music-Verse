// DarkModeContext.js
import { createContext } from 'react';

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export default DarkModeContext;
