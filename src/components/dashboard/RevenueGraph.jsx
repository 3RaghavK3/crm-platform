import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltip: {
            backgroundColor: '#1f2937',
            padding: 10,
            cornerRadius: 8,
        }
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    family: "'Inter', sans-serif",
                    size: 12
                },
                color: '#6b7280'
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: '#f3f4f6',
            },
            ticks: {
                font: {
                    family: "'Inter', sans-serif",
                    size: 12
                },
                color: '#6b7280',
                callback: function (value) {
                    return '$' + value;
                }
            },
            border: {
                display: false
            }
        },
    },
    elements: {
        bar: {
            borderRadius: 10, // "rounded-sm" aesthetic
        }
    }
};

const labels = ['26th Dec', '27th Dec', '28th Dec', '29th Dec', '30th Dec', '31st Dec', '1st Jan', '2nd Jan'];

const data = {
    labels,
    datasets: [
        {
            label: 'Revenue',
            data: [15000, 18000, 12000, 22000, 19000, 25000, 21000, 24000],
            backgroundColor: '#6366f1', // Indigo-500
            hoverBackgroundColor: '#4f46e5', // Indigo-600
            barThickness: 'flex',
            maxBarThickness: 100,
        },
    ],
};

const RevenueGraph = () => {
    return (
        <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg border flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Revenue</h2>
            <div className="flex-1 min-h-0">
                <Bar options={options} data={data} />
            </div>
        </div>
    );
};

export default RevenueGraph;
