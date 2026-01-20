import React from 'react';
import Navbar from '../components/Navbar';
import Notice from '../components/Notice';
import RevenueGraph from '../components/dashboard/RevenueGraph';
import SalesCategoryChart from '../components/dashboard/SalesCategoryChart';
import StatCards from '../components/dashboard/StatCards';
import { ArrowUpRight } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

const DashboardCard = ({ title, value, bg }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100">
        <div className={`${bg} p-4 relative overflow-hidden bg-opacity-50`}>
            <div className="flex justify-between items-start relative z-10">
                <div className="text-gray-800 text-lg font-medium">{title}</div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/40 rounded-full blur-xl"></div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
        </div>
        <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            <div className="flex items-center mt-2 text-sm text-gray-500">
                <span className="text-green-700 flex items-center bg-green-100 px-2 py-0.5 rounded-full font-bold">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +12.5%
                </span>
                <span className="ml-2">from last month</span>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const stats = [
        { title: 'Total Revenue', value: '$12,450', bg: 'bg-blue-500' },
        { title: 'Total Orders', value: '150', bg: 'bg-green-400' },
        { title: 'Total Visitors', value: '2,500', bg: 'bg-yellow-400' },
        { title: 'Net Profit', value: '$3,200', bg: 'bg-orange-400' },
    ];

    const { orders } = useOrders();

    // Calculate awaiting counts
    const { awaitingOrdersCount, awaitingResponseCount } = React.useMemo(() => {
        // Unique Customers with 'Await' status orders
        const customersWithAwaitingOrders = new Set(
            orders.filter(o => o.status === 'Await').map(o => o.customer)
        );

        // Unique Customers with 'New' status orders (Awaiting response)
        const customersWithNewOrders = new Set(
            orders.filter(o => o.status === 'New').map(o => o.customer)
        );

        return {
            awaitingOrdersCount: customersWithAwaitingOrders.size,
            awaitingResponseCount: customersWithNewOrders.size
        };
    }, [orders]);

    return (
        <div className="flex-1 flex flex-col p-6 h-full overflow-y-auto bg-gray-50">
            <Navbar />
            <Notice />

            {/* Dashboard Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">

                {/* Top Left: 4 Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                        <DashboardCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            bg={stat.bg}
                        />
                    ))}
                </div>

                {/* Top Right: Revenue Graph */}
                <div className="h-full min-h-[300px]">
                    <RevenueGraph />
                </div>

                {/* Bottom Left: Customer Action Stats */}
                <div className="h-full">
                    <StatCards
                        awaitingOrdersCount={awaitingOrdersCount}
                        awaitingResponseCount={awaitingResponseCount}
                    />
                </div>

                {/* Bottom Right: Sales Chart */}
                <div className="h-full min-h-[300px]">
                    <SalesCategoryChart />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
