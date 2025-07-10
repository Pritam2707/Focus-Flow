// BarChart.js
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Study Hours',
      data: [3, 4, 2, 5, 6],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderRadius: 5
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    },
    title: {
      display: true,
      text: 'Weekly Study Hours'
    }
  }
}

export default function BarChart() {
  return <Bar data={data} options={options} />
}
