import { useTheme } from "../hooks/useTheme";
import { lightTheme,darkTheme,orangeTheme } from "../constants/Theme";
import type { Theme } from "../types/Theme";
export default function ThemeSelectionModal() {
    const {  toggleTheme,theme ,setShowToggleModal} = useTheme();
    const setTheme=(theme:Theme)=>{
        toggleTheme(theme);
        localStorage.setItem('theme', JSON.stringify(theme));
       setShowToggleModal(false);
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-75 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="p-6 rounded-lg shadow-lg w-96" style={{ backgroundColor: theme.background, color: theme.text }}> 
            <h2 className="text-xl font-semibold mb-4">Select Theme</h2>
            <div className="flex flex-col space-y-4">
            <button
                onClick={() => setTheme(lightTheme)}
                className={`p-2 rounded ` }
            style={{ backgroundColor: lightTheme.primary, color: lightTheme.text }}>
                Light Theme
            </button>
            <button
                onClick={() => setTheme(darkTheme)}
                className={`p-2 rounded ` }
            style={{ backgroundColor: darkTheme.primary, color: darkTheme.text }}>
                Dark Theme
            </button>
            <button
                onClick={() => setTheme(orangeTheme)}
                className={`p-2 rounded ` }
            style={{ backgroundColor: orangeTheme.primary, color: orangeTheme.text }}>
                Orange Theme
            </button>
            </div>
        </div>
        </div>
    );
    }