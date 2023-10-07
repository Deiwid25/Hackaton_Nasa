import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ScatterController,
} from 'chart.js';

import { Bar, Line} from 'react-chartjs-2';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ScatterController,
    Title,
    Tooltip,
    Legend
);

//Level Profile Data and Options
export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
            position: 'right' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },

    },
    scales: {
        y: {
            grid: {
                display: false
            },
            min: 0,
            max: 4,
            title: {
                display: true,
                text: "Profundidad [m]"
            },



        },
        x: {
            grid: {
                display: false
            },
            title: {
                display: true,
                text: "Distancia desde la margen izquierda [m]"
            },
        }
    },

};

const levelProfile = {
    x: [0, 0.9, 1.8, 2.8, 3.7, 4.6, 5.5],
    y: [2.5, 2.5, 0.3, 0.2, 0.1, 0.2, 2.6]
}
const labels = levelProfile.x;
const averageLevel = 0.65;
const averageLevelLine = new Array(7).fill(averageLevel);
const riskLevels = [1.5, 0.5, 0.5, 1];
const data = {
    labels: labels,
    datasets: [
        {
            axis: 'y',
            label: 'Perfil del nivel',
            // data: [2.5, 2.5, 0.3, 0.2, 0.1, 0.2, 2.6, 2.6],
            data: levelProfile.y,
            fill: 'origin',
            backgroundColor: [
                'grey'
            ],
            borderColor: [
                'grey'
            ],
            borderWidth: 1,
            pointRadius: 0,
        },
        {
            axis: 'y',
            label: 'Nivel',
            data: averageLevelLine,
            fill: 'origin',
            backgroundColor: [
                'rgb(75, 192, 192)',

            ],
            borderColor: [
                'rgb(75, 192, 192)',

            ],
            borderWidth: 1,
            pointRadius: 1,
        },


    ]
};
//Level Bar Data and Options
export const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },

    },
    scales: {
        y: {
            display: false,
            beginAtZero: true,
            stacked: true,
            max: 3.5,
            grid: {
                display: false
            },

        },
        x: {
            stacked: true,
            grid: {
                display: false
            },
            title: {
                display: true,
                text: ""

            }
        }
    }
}

const dataBar = {
    labels: [""],
    datasets: [
        {
            type: 'scatter',
            label: 'Nivel promedio actual',
            data: [{ x: "", y: averageLevel }],
            backgroundColor: 'black',
            pointRadius: 5,
        },
        {
            axis: 'y',
            label: 'Nivel de agua seguro',
            data: [riskLevels[0]],
            fill: 'origin',
            backgroundColor: [
                'green'
            ],
            borderColor: [
                'green'
            ],
            borderWidth: 1,
            pointRadius: 0,
            barThickness: 12,
        },
        {
            axis: 'y',
            label: 'Nivel de precaución',
            data: [riskLevels[1]],
            fill: 'origin',
            backgroundColor: [
                'yellow',

            ],
            borderColor: [
                'yellow',

            ],
            borderWidth: 1,
            pointRadius: 0,
            barThickness: 12,

        },
        {
            axis: 'y',
            label: 'Inundación menor',
            data: [riskLevels[2]],
            fill: 'origin',
            backgroundColor: [
                'orange'
            ],
            borderColor: [
                'orange'
            ],
            borderWidth: 1,
            pointRadius: 0,
            barThickness: 12,

        },
        {
            axis: 'y',
            label: 'Inundación mayor',
            data: [riskLevels[3]],
            fill: 'origin',
            backgroundColor: [
                'red'
            ],
            borderColor: [
                'red'
            ],
            borderWidth: 1,
            pointRadius: 0,
            barThickness: 12,

        },

    ]
};

export function AverageLevelChart() {
    return (<div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "95%", height: "100%" }} >
            <Line options={options} data={data} />
        </div>
        <div style={{ width: "5%", height: "100%" }} >
            <Bar options={optionsBar} data={dataBar as any} />
        </div>
    </div>)
}
