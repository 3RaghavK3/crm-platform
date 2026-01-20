import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCustomers } from './CustomerContext';

const OrderContext = createContext();

export const useOrders = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    // We need access to customers to generate valid orders, but to avoid circular dependency
    // (CustomerProvider might use OrderProvider to calc active status), 
    // we will just hardcode the names since they are static for now, or just rely on matching strings.
    // Ideally, we would fetch customers here or have a root store.

    // For this implementation, we'll generate the initial orders here.

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Hardcoded orders to ensure specific Active/Inactive split
        // Current date assumed approx Jan 20, 2026
        // Active (< 30 days): Aarav, Priya, Rohan, Ananya
        // Inactive (> 30 days): Vikram, Neha, Arjun, Meera

        const hardcodedOrders = [
            // Active Customers (Recent dates: Jan 2026, Dec 2025)
            { id: '1001', customer: 'Aarav Patel', phone: '+91 98765 43210', category: 'Laptops', price: 1200.00, date: new Date('2026-01-15'), payment: 'Credit Card', status: 'Delivered' },
            { id: '1002', customer: 'Aarav Patel', phone: '+91 98765 43210', category: 'Accessories', price: 50.00, date: new Date('2026-01-10'), payment: 'Credit Card', status: 'Delivered' },
            { id: '1003', customer: 'Priya Sharma', phone: '+91 98989 89898', category: 'Mobiles', price: 800.00, date: new Date('2026-01-05'), payment: 'PayPal', status: 'On way' },
            { id: '1004', customer: 'Priya Sharma', phone: '+91 98989 89898', category: 'Accessories', price: 30.00, date: new Date('2025-12-28'), payment: 'PayPal', status: 'Delivered' },
            { id: '1005', customer: 'Rohan Gupta', phone: '+91 91234 56789', category: 'Tablets', price: 600.00, date: new Date('2026-01-18'), payment: 'Bank Transfer', status: 'New' },
            { id: '1006', customer: 'Rohan Gupta', phone: '+91 91234 56789', category: 'Mobiles', price: 450.00, date: new Date('2026-01-02'), payment: 'Bank Transfer', status: 'Delivered' },
            { id: '1007', customer: 'Ananya Singh', phone: '+91 88776 65544', category: 'Laptops', price: 1500.00, date: new Date('2026-01-12'), payment: 'Credit Card', status: 'Await' },
            { id: '1008', customer: 'Ananya Singh', phone: '+91 88776 65544', category: 'Accessories', price: 100.00, date: new Date('2025-12-25'), payment: 'Credit Card', status: 'Delivered' },
            { id: '1009', customer: 'Aarav Patel', phone: '+91 98765 43210', category: 'Mobiles', price: 900.00, date: new Date('2025-12-30'), payment: 'Credit Card', status: 'Delivered' },
            { id: '1010', customer: 'Priya Sharma', phone: '+91 98989 89898', category: 'Tablets', price: 300.00, date: new Date('2026-01-08'), payment: 'PayPal', status: 'On way' },

            // Inactive Customers (Older dates: Nov 2025, Oct 2025)
            { id: '1011', customer: 'Vikram Malhotra', phone: '+91 77665 54433', category: 'Mobiles', price: 700.00, date: new Date('2025-11-20'), payment: 'Cash', status: 'Delivered' },
            { id: '1012', customer: 'Vikram Malhotra', phone: '+91 77665 54433', category: 'Accessories', price: 40.00, date: new Date('2025-10-15'), payment: 'Cash', status: 'Delivered' },
            { id: '1013', customer: 'Neha Kapoor', phone: '+91 99887 76655', category: 'Laptops', price: 1300.00, date: new Date('2025-11-05'), payment: 'Credit Card', status: 'Delivered' },
            { id: '1014', customer: 'Neha Kapoor', phone: '+91 99887 76655', category: 'Mobiles', price: 600.00, date: new Date('2025-09-10'), payment: 'Credit Card', status: 'Delivered' },
            { id: '1015', customer: 'Arjun Reddy', phone: '+91 90000 11111', category: 'Accessories', price: 25.00, date: new Date('2025-11-25'), payment: 'Bank Transfer', status: 'Delivered' },
            { id: '1016', customer: 'Arjun Reddy', phone: '+91 90000 11111', category: 'Tablets', price: 350.00, date: new Date('2025-10-30'), payment: 'Bank Transfer', status: 'Delivered' },
            { id: '1017', customer: 'Meera Iyer', phone: '+91 98765 09876', category: 'Mobiles', price: 550.00, date: new Date('2025-10-05'), payment: 'PayPal', status: 'Delivered' },
            { id: '1018', customer: 'Meera Iyer', phone: '+91 98765 09876', category: 'Accessories', price: 60.00, date: new Date('2025-08-15'), payment: 'PayPal', status: 'Delivered' },
            { id: '1019', customer: 'Vikram Malhotra', phone: '+91 77665 54433', category: 'Laptops', price: 1100.00, date: new Date('2025-11-01'), payment: 'Cash', status: 'Delivered' },
            { id: '1020', customer: 'Neha Kapoor', phone: '+91 99887 76655', category: 'Accessories', price: 80.00, date: new Date('2025-10-20'), payment: 'Credit Card', status: 'Delivered' },
        ];

        setOrders(hardcodedOrders);
    }, []);

    const addOrder = (newOrder) => {
        // Generate a simple ID based on existing ones or random if empty
        const lastId = orders.length > 0 ? Math.max(...orders.map(o => parseInt(o.id))) : 1000;
        const orderWithId = {
            ...newOrder,
            id: (lastId + 1).toString()
        };
        setOrders(prev => [orderWithId, ...prev]);
    };

    return (
        <OrderContext.Provider value={{ orders, setOrders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
