import ProgressCircle from "../components/ProgressCircle";
import ThemeSelectionModal from "../components/ThemeSelectionModal";
import { usePomodaro } from "../hooks/usePomodaro";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
    const { startTimer, timeInSeconds, mode,resetTimer } = usePomodaro();

    const { theme ,showToggleModal,setShowToggleModal} = useTheme();
    const changeTheme = () => {
        setShowToggleModal(true);
    };
    return (
        <div className="h-screen flex flex-col" style={{ backgroundColor: theme.background, color: theme.text }}>
            {/* Header stays at the top */}
            <div className="w-full p-4">
                <h1 className="text-4xl font-bold" style={{color:theme.text}}>Focus Flow</h1>
            </div>
            {/* Timer centered in remaining space */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center" style={{ backgroundColor: theme.background, color: theme.text, padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <ProgressCircle timeInSeconds={timeInSeconds} />
                    <span className="text-2xl font-semibold mt-4" style={{ color: theme.text }}>
                        Mood: {
                            (() => {
                                switch (mode) {
                                    case 'pomodoro':
                                        return 'Focus Time';
                                    case 'shortBreak':
                                        return 'Short Break';
                                    case 'longBreak':
                                        return 'Long Break';
                                    default:
                                        return 'Unknown';
                                }
                            })()
                        }
                    </span>
                    <div className="flex gap-1 items-center mt-4">
                         <button className="mt-4 px-4 py-2 rounded" onClick={startTimer} style={{ backgroundColor: theme.primary, color: theme.text }}>Start</button>
                    <button className="mt-4 px-4 py-2 rounded" onClick={resetTimer} style={{ backgroundColor: theme.primary, color: theme.text }}>Reset</button>
                    <button className="mt-4 px-4 py-2 rounded" onClick={changeTheme} style={{ backgroundColor: theme.primary, color: theme.text }}>Change Theme</button>

                    </div>
                   </div>
            </div>
            {showToggleModal && <ThemeSelectionModal />}
        </div>
    );
}
