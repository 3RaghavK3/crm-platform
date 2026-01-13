import React, { useState, useEffect } from 'react';
import OrderHeader from '../components/orders/OrderHeader';
import OrderStatCards from '../components/orders/OrderStatCards';
import OrderActions from '../components/orders/OrderActions';
import OrderFilters from '../components/orders/OrderFilters';
import OrdersTable from '../components/orders/OrdersTable';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [stats, setStats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ category: [], status: [] });
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'default' }); // 'asc', 'desc', 'default'

    // Helper to generate random date within last year
    const getRandomDate = () => {
        const start = new Date(2024, 0, 1);
        const end = new Date();
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    // Helper to generate random price
    const getRandomPrice = () => parseFloat((Math.random() * (2000 - 100) + 100).toFixed(2));


    useEffect(() => {
        const categories = ['Laptops', 'Mobiles'];
        const payments = ['PayPal', 'Credit Card', 'Bank Transfer'];
        const statuses = ['New', 'Await', 'On way', 'Delivered'];
        const firstNames = ['Kris', 'John', 'Alice', 'Bob', 'Emma', 'David', 'Sarah', 'Mike'];
        const lastNames = ['Payer', 'Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Taylor'];

        const generatedOrders = Array.from({ length: 7 }, (_, i) => ({
            id: (674839 + i).toString(),
            customer: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            phone: '099 758 9092', // Static as requested to randomize "too for now" but detailed list was specific categories/dates/payments
            category: categories[Math.floor(Math.random() * categories.length)],
            price: getRandomPrice(),
            date: getRandomDate(),
            payment: payments[Math.floor(Math.random() * payments.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            statusColor: '' // Will be set dynamically
        }));

        setOrders(generatedOrders);
        setFilteredOrders(generatedOrders);
    }, []);

    // Calculate Stats
    useEffect(() => {
        const calculateStats = () => {
            const newOrdersCount = orders.filter(o => o.status === 'New').length;
            const awaitOrdersCount = orders.filter(o => o.status === 'Await').length;
            const onWayOrdersCount = orders.filter(o => o.status === 'On way').length;
            const deliveredOrdersCount = orders.filter(o => o.status === 'Delivered').length;

            const newStats = [
                { title: 'New orders', count: newOrdersCount, change: '+2.67%', isPositive: true, bg: 'bg-blue-500', text: 'text-white' },
                { title: 'Await accepting orders', count: awaitOrdersCount, change: '+2.67%', isPositive: true, bg: 'bg-orange-400', text: 'text-white' },
                { title: 'On way orders', count: onWayOrdersCount, change: '-0.67%', isPositive: false, bg: 'bg-yellow-400', text: 'text-white' },
                { title: 'Delivered orders', count: deliveredOrdersCount, change: '+2.87%', isPositive: true, bg: 'bg-green-400', text: 'text-white' },
            ];
            setStats(newStats);
        };
        calculateStats();
    }, [orders]);


    // Filtering and Sorting Logic
    useEffect(() => {
        let result = [...orders];

        // Search
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(order =>
                order.customer.toLowerCase().includes(lowerTerm) ||
                order.id.includes(lowerTerm) ||
                order.category.toLowerCase().includes(lowerTerm)
            );
        }

        // Filters (Category & Status)
        if (filters.category.length > 0) {
            result = result.filter(order => filters.category.includes(order.category));
        }
        if (filters.status.length > 0) {
            result = result.filter(order => filters.status.includes(order.status));
        }

        // Sorting
        if (sortConfig.key && sortConfig.direction !== 'default') {
            result.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'price') {
                    return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
                } else if (sortConfig.key === 'date') {
                    return sortConfig.direction === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
                }
            });
        }

        setFilteredOrders(result);
    }, [orders, searchTerm, filters, sortConfig]);

    const handleSortChange = (key) => {
        setSortConfig(prev => {
            if (prev.key === key) {
                if (prev.direction === 'default') return { key, direction: 'asc' };
                if (prev.direction === 'asc') return { key, direction: 'desc' };
                return { key: null, direction: 'default' };
            }
            return { key, direction: 'asc' };
        });
    };

    const handleStatusChange = (id, newStatus) => {
        setOrders(prevOrders => prevOrders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };


    const toggleFilter = (type, value) => {
        setFilters(prev => {
            const currentFilters = prev[type];
            const newFilters = currentFilters.includes(value)
                ? currentFilters.filter(item => item !== value)
                : [...currentFilters, value];
            return { ...prev, [type]: newFilters };
        });
    };

    const clearFilters = () => {
        setFilters({ category: [], status: [] });
        setSearchTerm('');
    };


    return (
        <div className="flex-1 flex flex-col p-6 bg-gray-50 h-full overflow-y-auto">
            <OrderHeader />
            <OrderStatCards stats={stats} />
            <OrderActions
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortConfig={sortConfig}
                handleSortChange={handleSortChange}
                totalOrders={orders.length}
            />
            <OrderFilters
                filters={filters}
                toggleFilter={toggleFilter}
                clearFilters={clearFilters}
                totalOrders={orders.length}
                filteredCount={filteredOrders.length}
            />
            <OrdersTable
                orders={filteredOrders}
                handleStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default Orders;
