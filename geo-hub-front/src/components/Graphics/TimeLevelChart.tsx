import zoomPlugin from 'chartjs-plugin-zoom'
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

import { Line, Bar } from 'react-chartjs-2';

import levelData from "./timeLevelData.json"



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ScatterController,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);


interface TimeLevelChartProps {
    timeInterval: number;
}

const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

// const timeInterval = 180;
// const initialDate = new Date;
// const puntosTiempo: string[] | [null] = [];

// //Data simulation of last 30 days
// const level30DaysData = Array.from({ length: timeInterval }, () => Math.floor(Math.random() * 2.5 * 10) / 10)

// //This function give format of date of X axis 
function formatDate(date: Date): string {
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()];

    return `${hour}:${minutes} ${day} ${month}`
}

// //This function takes a date a return it a new date a minute ago than initial one
// function subtractMinutes(date: Date, minutes: number): Date {
//     return new Date(date.getTime() - minutes * 60000); // 60000ms = 1 minuto
// }
// //This cycle fill the array "puntosTiempo" with dates minute per minutes from present to number of minutes selected by user in the past
// for (let i = 0; i < timeInterval; i++) {
//     const nuevoTiempo = subtractMinutes(initialDate, i);
//     puntosTiempo.push(formatDate(nuevoTiempo));
// }


export function TimeLevelChart({ timeInterval }: TimeLevelChartProps) {

    const dataLevel = levelData?.niveles?.nivel12

    const dataPoints1 = dataLevel.nivelUltimas3h

    const riskLevel = {
        'safe': dataLevel.nivelSeguro,
        'warning': dataLevel.nivelPrecaucion - dataLevel.nivelSeguro,
        'minorFlood': dataLevel.inundacionMenor - dataLevel.nivelPrecaucion,
        'highFlood': dataLevel.inundaciónMayor - dataLevel.inundacionMenor,
    }

    //Maximim Level
    const maxLevel = dataPoints1.y.reduce((a, b) => Math.max(a, b), -Infinity)

    //Dates must come as ISOStringDate from .json

    //This are the coordinates to plot the chart
    const levelProfile = {
        x: dataPoints1.x.map((date) => formatDate(new Date(date))),
        y: dataPoints1.y

    }

    const dataPoints = levelProfile.x.map((xValue, index) => {
        return {
            x: xValue,
            y: levelProfile.y[index]
        }
    })


    // const labels = levelProfile?.x;
    //Data of Line Chart
    const data = {
        labels: levelProfile.x,
        datasets: [
            {
                axis: 'y',
                label: 'Perfil del nivel',
                data: levelProfile.y,
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

    //Data of Level Bar 
    const dataBar = {
        labels: [""],
        datasets: [
            {
                type: 'scatter',
                label: 'Nivel promedio actual',
                data: [{ x: "", y: maxLevel }],
                backgroundColor: 'black',
                pointRadius: 5,
            },
            {
                axis: 'y',
                label: 'Nivel de agua seguro',
                data: [riskLevel.safe],
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
                data: [riskLevel.warning],
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
                data: [riskLevel.minorFlood],
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
                data: [riskLevel.highFlood],
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



    return (<div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "95%", height: "100%" }} >
            <Line options={options} data={data} />
        </div>
        <div style={{ width: "5%", height: "100%" }} >
            <Bar options={optionsBar} data={dataBar as any} />
        </div>
    </div>)
}

const riskLevels = [1.5, 0.5, 0.5, 1];


//Level Profile Data and Options
const options = {
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
        zoom: {
            pan: {
                enabled: true,
                mode: 'x' as const, // Puede ser 'x', 'y' o 'xy' dependiendo de las direcciones en las que quieras permitir el paneo
                speed: 20,
                threshold: 10
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'x' as const, // Puede ser 'x', 'y' o 'xy' dependiendo de las direcciones en las que quieras permitir el zoom

            }
        }

    },
    scales: {
        y: {
            grid: {
                display: false
            },
            min: 0,
            max: 3.5,
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
                display: false,
                text: "Fecha"
            },
            ticks: {
                maxTicksLimit: 4,

            },
        }
    },

};


//Level Bar Data and Options
const optionsBar = {
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
                display: false,
                text: ""

            }
        }
    }
}