import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './hooks/useTheme';
import Home from './pages/Home';
import { PomodaroProvider } from './hooks/usePomodaro';

export default function App() {
  return (
    <BrowserRouter>
    <ThemeProvider>
      <PomodaroProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </PomodaroProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
