import React, { createContext, useContext, useState } from 'react';

const CustomerContext = createContext();

export const useCustomers = () => {
    return useContext(CustomerContext);
};

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([
        {
            id: '1',
            name: 'Aarav Patel',
            email: 'aarav.patel@example.com',
            phone: '+91 98765 43210',
            location: 'Mumbai, Maharashtra',
            joinDate: '2023-05-15',
            status: 'Active',
            orders: 12,
            spent: 24500,
            avatar: 'https://ui-avatars.com/api/?name=Aarav+Patel&background=random'
        },
        {
            id: '2',
            name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            phone: '+91 98989 89898',
            location: 'Delhi, New Delhi',
            joinDate: '2023-06-20',
            status: 'Active',
            orders: 8,
            spent: 15200,
            avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=random'
        },
        {
            id: '3',
            name: 'Rohan Gupta',
            email: 'rohan.gupta@example.com',
            phone: '+91 91234 56789',
            location: 'Bangalore, Karnataka',
            joinDate: '2023-07-10',
            status: 'Active',
            orders: 2,
            spent: 3500,
            avatar: 'https://ui-avatars.com/api/?name=Rohan+Gupta&background=random'
        },
        {
            id: '4',
            name: 'Ananya Singh',
            email: 'ananya.singh@example.com',
            phone: '+91 88776 65544',
            location: 'Hyderabad, Telangana',
            joinDate: '2023-08-05',
            status: 'Active',
            orders: 15,
            spent: 32000,
            avatar: 'https://ui-avatars.com/api/?name=Ananya+Singh&background=random'
        },
        {
            id: '5',
            name: 'Vikram Malhotra',
            email: 'vikram.m@example.com',
            phone: '+91 77665 54433',
            location: 'Pune, Maharashtra',
            joinDate: '2023-09-12',
            status: 'Inactive',
            orders: 5,
            spent: 9800,
            avatar: 'https://ui-avatars.com/api/?name=Vikram+Malhotra&background=random'
        },
        {
            id: '6',
            name: 'Neha Kapoor',
            email: 'neha.kapoor@example.com',
            phone: '+91 99887 76655',
            location: 'Chennai, Tamil Nadu',
            joinDate: '2023-10-01',
            status: 'Inactive',
            orders: 20,
            spent: 45000,
            avatar: 'https://ui-avatars.com/api/?name=Neha+Kapoor&background=random'
        },
        {
            id: '7',
            name: 'Arjun Reddy',
            email: 'arjun.reddy@example.com',
            phone: '+91 90000 11111',
            location: 'Hyderabad, Telangana',
            joinDate: '2023-11-15',
            status: 'Inactive',
            orders: 0,
            spent: 0,
            avatar: 'https://ui-avatars.com/api/?name=Arjun+Reddy&background=random'
        },
        {
            id: '8',
            name: 'Meera Iyer',
            email: 'meera.iyer@example.com',
            phone: '+91 98765 09876',
            location: 'Kochi, Kerala',
            joinDate: '2023-12-05',
            status: 'Inactive',
            orders: 6,
            spent: 11200,
            avatar: 'https://ui-avatars.com/api/?name=Meera+Iyer&background=random'
        }
    ]);

    const updateCustomer = (updatedCustomer) => {
        setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    };
    const deleteCustomer = (id) => {
        setCustomers(prev => prev.filter(c => c.id !== id));
    };

    return (
        <CustomerContext.Provider value={{ customers, setCustomers, updateCustomer, deleteCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
};
