import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

interface EcaChartProps {
  codigo: string;
  selectedTime: string[];
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    barPercentage: number;
  }[];
}

const EcaChart: React.FC<EcaChartProps> = ({ codigo, selectedTime }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [maximo, setMaximo] = useState<number>(0);
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_GET_PM25_GEOGRAPH}${codigo}/`)
      .then(response => {
        const dataFromApi = response.data;

        let hours = dataFromApi.info.Horas;
        let cant = dataFromApi.info.PM25_72H;

        if (selectedTime.includes('12 Horas')) {
          hours = hours.slice(-12);
          cant = cant.slice(-12);
        } else if (selectedTime.includes('24 Horas')) {
          hours = hours.slice(-24);
          cant = cant.slice(-24);
        } else if (selectedTime.includes('72 Horas')) {
          hours = hours.slice(-72);
          cant = cant.slice(-72);
        }

        const hoursWithFormat = hours.map((hour: number) => `${hour}:00`);
        const calMaximo = Math.ceil((Math.max(...cant) + 5) / 5) * 5;
        setMaximo(calMaximo);

        setTimeout(() => {
          setChartData({
            labels: hoursWithFormat,
            datasets: [
              {
                data: cant,
                backgroundColor: ['rgba(82, 183, 196)'],
                barPercentage: 0.5,
              },
            ],
          });
        }, 1); // 0.001 segundos
      })
      .catch(error => {
        console.error('Error al obtener datos de la API', error);
      });
  }, [codigo, selectedTime]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        font: {
          size: 20,
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x' as const,
          speed: 20,
          threshold: 10,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x' as const,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: maximo,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
        angleLines: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: isMobile ? '69vw' : '30vw',
        height: isMobile ? '17vh' : '30vh',
      }}>
      {chartData ? <Bar data={chartData} options={options} /> : <div></div>}
    </div>
  );
};

export default EcaChart;
