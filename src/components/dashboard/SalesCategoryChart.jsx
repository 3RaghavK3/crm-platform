import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesCategoryChart = () => {
    const data = {
        labels: ['Electronics', 'Accessories', 'Mobiles', 'Laptops', 'Tablets'],
        datasets: [
            {
                label: '# of Sales',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    '#3b82f6', // Blue-500
                    '#4ade80', // Green-400
                    '#facc15', // Yellow-400
                    '#fb923c', // Orange-400
                    '#818cf8', // Indigo-400
                ],
                borderColor: [
                    '#ffffff',
                    '#ffffff',
                    '#ffffff',
                    '#ffffff',
                    '#ffffff',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%', // Thinner doughnut
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 13,
                        weight: '500' // Semi-bold
                    },
                    color: '#374151' // Gray-700
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#111827',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 4,
                titleFont: { family: "'Inter', sans-serif", size: 14, weight: 'bold' },
                bodyFont: { family: "'Inter', sans-serif", size: 13 },
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw;
                        const total = context.chart._metasets[context.datasetIndex].total;
                        const percentage = Math.round((value / total) * 100) + '%';
                        return ` ${label}: ${value} (${percentage})`;
                    }
                }
            }
        },
    };

    // Plugin to show text in center (optional)
    const centerText = {
        id: 'centerText',
        beforeDraw: function (chart) {
            const width = chart.width, height = chart.height, ctx = chart.ctx;
            ctx.restore();
            const fontSize = (height / 114).toFixed(2);
            ctx.font = `bold ${fontSize}em Inter`;
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#374151";

            const text = "Sales",
                textX = Math.round((width - ctx.measureText(text).width) / 2) - 40, // Offset for legend
                textY = height / 2;

            ctx.save();
            // Only draw if label is hidden or adjusted
            // ctx.fillText(text, textX, textY); 
            ctx.restore();
        }
    };


    return (
        <div className="w-full h-full p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Sales by Category</h2>
                <select className="text-sm border-none bg-gray-50 text-gray-500 rounded-lg px-2 py-1 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
                    <option>This Week</option>
                    <option>This Month</option>
                </select>
            </div>
            <div className="flex-1 min-h-0 relative">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default SalesCategoryChart;
