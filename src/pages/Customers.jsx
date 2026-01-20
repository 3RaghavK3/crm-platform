import React, { useState } from 'react';
import { useCustomers } from '../context/CustomerContext';
import { useOrders } from '../context/OrderContext';
import OrderStatCards from '../components/orders/OrderStatCards';
import AddCustomerModal from '../components/customers/AddCustomerModal';
import { Settings, Bell, User, Search, LayoutGrid, List as ListIcon, MapPin, Phone, Mail, Calendar, Pencil, Trash2 } from 'lucide-react';

const Customers = () => {
    const { customers, deleteCustomer, updateCustomer } = useCustomers();
    const { orders } = useOrders();
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [customerToEdit, setCustomerToEdit] = useState(null);



    // Calculate Stats
    // Calculate Stats
    const totalCustomers = customers.length;

    // Use the stored status directly since we may have manually updated it, 
    // and the initial values are already synced with the hardcoded order history.
    const activeCustomers = customers.filter(c => c.status === 'Active').length;
    const inactiveCustomers = customers.filter(c => c.status === 'Inactive').length;
    const newCustomers = customers.filter(c => {
        const joinDate = new Date(c.joinDate);
        const now = new Date();
        const diffTime = Math.abs(now - joinDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    }).length;

    const stats = [
        { title: 'Total Customers', count: totalCustomers, bg: 'bg-blue-500', text: 'text-white' },
        { title: 'Active Customers', count: activeCustomers, bg: 'bg-green-400', text: 'text-white' },
        { title: 'Inactive Customers', count: inactiveCustomers, bg: 'bg-yellow-400', text: 'text-white' },
        { title: 'New (This Month)', count: newCustomers, bg: 'bg-orange-400', text: 'text-white' },
    ];

    // Filter Customers
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (customer) => {
        setCustomerToEdit(customer);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            deleteCustomer(id);
        }
    };

    const handleSaveCustomer = (updatedData) => {
        updateCustomer(updatedData);
        setIsEditModalOpen(false);
        setCustomerToEdit(null);
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    // Color palette for avatars (light colors)
    const avatarColors = [
        'bg-blue-100 text-blue-600',
        'bg-green-100 text-green-600',
        'bg-yellow-100 text-yellow-600',
        'bg-orange-100 text-orange-600'
    ];

    return (
        <div className="flex-1 flex flex-col p-6 bg-gray-50 h-full overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
                <div className="flex items-center space-x-3">
                    <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                        <Bell className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <OrderStatCards stats={stats} />

            {/* Actions Bar */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64 bg-white"
                    />
                </div>

                <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                            ? 'bg-indigo-100 text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list'
                            ? 'bg-indigo-100 text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <ListIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCustomers.map((customer, index) => (
                        <div key={customer.id} className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center border border-gray-100 group">
                            <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEditClick(customer)}
                                    className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(customer.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className={`w-20 h-20 rounded-full mb-2 flex items-center justify-center text-2xl font-bold shadow-sm ${avatarColors[index % avatarColors.length]}`}>
                                {getInitials(customer.name)}
                            </div>

                            <div className="mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 leading-tight">{customer.name}</h3>
                                <p className="text-sm text-gray-500">{customer.location}</p>
                            </div>

                            <div className="w-full space-y-2 pt-3 border-t border-gray-50">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500 flex-shrink-0">
                                        <Mail className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="text-gray-700 font-medium truncate text-xs">{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500 flex-shrink-0">
                                        <Phone className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="text-gray-700 font-medium text-xs">{customer.phone}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm mt-1">
                                    <span className="text-gray-500 text-xs">Status</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {customer.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Join Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                                    {/* Empty header for actions */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCustomers.map((customer, index) => (
                                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${avatarColors[index % avatarColors.length]}`}>
                                                    {getInitials(customer.name)}
                                                </div>
                                                <div className="font-medium text-gray-900">{customer.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-900">{customer.email}</span>
                                                <span className="text-xs text-gray-500">{customer.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-gray-400" />
                                                {customer.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-gray-400" />
                                                {customer.joinDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {customer.orders}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={customer.status}
                                                onChange={(e) => updateCustomer({ ...customer, status: e.target.value })}
                                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full outline-none cursor-pointer border-none appearance-none ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                <option value="Active" className="bg-white text-gray-900">Active</option>
                                                <option value="Inactive" className="bg-white text-gray-900">Inactive</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEditClick(customer)}
                                                    className="p-1 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(customer.id)}
                                                    className="p-1 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <AddCustomerModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setCustomerToEdit(null);
                }}
                onAddOrUpdateCustomer={handleSaveCustomer}
                customerToEdit={customerToEdit}
            />
        </div>
    );
};

export default Customers;
