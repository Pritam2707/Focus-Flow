import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Theme } from '../types/Theme'
import { lightTheme } from '../constants/Theme'

interface ThemeContextType {
  theme: Theme
  toggleTheme: (theme: Theme) => void
  showToggleModal: boolean;
  setShowToggleModal: (show: boolean) => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined)



export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme') || '') : lightTheme)
  const [showToggleModal,setShowToggleModal] = useState(false);
  const toggleTheme = (theme: Theme) => {
    setTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ showToggleModal,setShowToggleModal,theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }
  return context
}
