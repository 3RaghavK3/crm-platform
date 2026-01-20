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
import { Download } from 'lucide-react';

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
            backgroundColor: 'rgba(59, 130, 246, 0.9)', // Blue-500 equivalent
            padding: 12,
            cornerRadius: 8,
            titleFont: { family: "'Inter', sans-serif", size: 13 },
            bodyFont: { family: "'Inter', sans-serif", size: 13, weight: 'bold' },
            displayColors: false,
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
                    size: 11
                },
                color: '#9ca3af' // Gray-400
            },
            border: { display: false }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: '#f3f4f6',
                borderDash: [4, 4],
            },
            ticks: {
                font: {
                    family: "'Inter', sans-serif",
                    size: 11
                },
                color: '#9ca3af',
                callback: function (value) {
                    return '$' + value / 1000 + 'k';
                },
                maxTicksLimit: 6
            },
            border: {
                display: false
            }
        },
    },
    elements: {
        bar: {
            borderRadius: 6,
        }
    }
};

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const data = {
    labels,
    datasets: [
        {
            label: 'Revenue',
            data: [15000, 18000, 12000, 22000, 19000, 25000, 21000],
            backgroundColor: '#3b82f6', // Blue-500
            hoverBackgroundColor: '#2563eb', // Blue-600
            barThickness: 40,
            maxBarThickness: 60,
        },
    ],
};

const RevenueGraph = () => {
    return (
        <div className="w-full h-full p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Revenue</h2>
                    <p className="text-sm text-gray-400">Weekly income</p>
                </div>
                <button className="p-2 bg-gray-50 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                </button>
            </div>
            <div className="flex-1 min-h-0">
                <Bar options={options} data={data} />
            </div>
        </div>
    );
};

export default RevenueGraph;
