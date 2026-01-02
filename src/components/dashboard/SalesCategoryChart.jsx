import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesCategoryChart = () => {
    const data = {
        labels: ['Pencil', 'Pen', 'Eraser', 'Sharpener', 'Scale'],
        datasets: [
            {
                label: '# of Sales',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',   // Red
                    'rgba(54, 162, 235, 0.8)',   // Blue
                    'rgba(255, 206, 86, 0.8)',   // Yellow
                    'rgba(75, 192, 192, 0.8)',   // Teal
                    'rgba(153, 102, 255, 0.8)',  // Purple
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    },
                    usePointStyle: true,
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        const value = context.raw;
                        const total = context.chart._metasets[context.datasetIndex].total;
                        const percentage = Math.round((value / total) * 100) + '%';
                        return label + value + ' (' + percentage + ')';
                    }
                }
            }
        },
    };

    // Custom plugin to draw percentage on chart segments
    const percentagePlugin = {
        id: 'percentagePlugin',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart;
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((element, index) => {
                    // Calculate percentage
                    const value = dataset.data[index];
                    const total = meta.total;
                    const percentage = Math.round((value / total) * 100) + '%';

                    // Get position
                    const { x, y } = element.tooltipPosition();

                    // Style text
                    ctx.save();
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 12px Inter';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(percentage, x, y);
                    ctx.restore();
                });
            });
        }
    };

    return (
        <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg border flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Sales by Category</h2>
            <div className="flex-1 min-h-0 flex items-center justify-center">
                <div className="w-full h-full">
                    <Doughnut data={data} options={options} plugins={[percentagePlugin]} />
                </div>
            </div>
        </div>
    );
};

export default SalesCategoryChart;
