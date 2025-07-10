import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react'

interface PomodaroContextType {
    timeInSeconds: number;
    mode: 'pomodoro' | 'shortBreak' | 'longBreak'
    setMode: (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => void
    setTimeInSeconds: (seconds: number) => void
    startTimer: () => void
    stopTimer: () => void
    resetTimer: () => void
}

const PomodaroContext = createContext<PomodaroContextType | undefined>(undefined)

export function PomodaroProvider({ children }: { children: ReactNode }) {
    const [timeInSeconds, setTimeInSeconds] = useState(localStorage.getItem('timeInSeconds') ? parseInt(localStorage.getItem('timeInSeconds') || '1500', 10) : 25 * 60)
    const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro')
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const startTimer = () => {
        if (intervalRef.current) return // Prevent multiple intervals
        
        intervalRef.current = setInterval(() => {
            setTimeInSeconds(prev => {
                localStorage.setItem('timeInSeconds', (prev - 1).toString())
                if (prev <= 0) {
                    switch (mode) {
                        case 'pomodoro':
                            setMode('shortBreak')
                            return 5 * 60
                        case 'shortBreak':
                            setMode('pomodoro')
                            return 25 * 60
                        case 'longBreak':
                            setMode('pomodoro')
                            return 25 * 60
                        default:
                            return prev
                    }
                }
                return prev - 1
            })
        }, 1000)
    }

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    const resetTimer = () => {
        stopTimer()
        setTimeInSeconds(25*60)
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return (
        <PomodaroContext.Provider value={{ timeInSeconds, mode, setMode, setTimeInSeconds, startTimer, stopTimer, resetTimer }}>
            {children}
        </PomodaroContext.Provider>
    )
}

export function usePomodaro() {
    const context = useContext(PomodaroContext)
    if (!context) {
        throw new Error('usePomodaro must be used inside PomodaroProvider')
    }
    return context
}

