import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { useTheme } from '../hooks/useTheme';
import { usePomodaro } from '../hooks/usePomodaro';

ChartJS.register(ArcElement, Tooltip)

export default function ProgressCircle({ timeInSeconds }: { timeInSeconds: number }) {
    const {theme} = useTheme();
    const {mode}=usePomodaro()
    const maxTime=()=>{switch(mode){
      case 'pomodoro':
        return 25 * 60;
      case 'shortBreak':
        return 5 * 60;
      case 'longBreak':
        return 15 * 60;
      default:
        return 0;
    }
}

  const data = {
    datasets: [
      {
        data: [timeInSeconds, maxTime() - timeInSeconds],
        backgroundColor: [theme.primary,theme.secondary],
        borderWidth: 0,
        cutout: '90%' 
      }
    ]
  }

  const options = {
    
    rotation: -90,
    circumference: 360,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
    }
  }

  return (
    <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 relative">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl md:text-6xl font-semibold">
          {Math.floor(timeInSeconds / 60)}:{String(timeInSeconds % 60).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
