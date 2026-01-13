import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const OrdersTable = ({ orders, handleStatusChange }) => {
    const statusColors = {
        'New': 'bg-blue-100 text-blue-700',
        'Await': 'bg-orange-100 text-orange-700',
        'On way': 'bg-yellow-100 text-yellow-700',
        'Delivered': 'bg-green-100 text-green-700'
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex-1">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4 w-10">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        </th>
                        <th className="p-4">Order Number</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 vertical-top">
                                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            </td>
                            <td className="p-4 font-medium text-gray-900 vertical-top">Nº{order.id}</td>
                            <td className="p-4 vertical-top">
                                <div className="font-medium text-gray-900">{order.customer}</div>
                                <div className="text-gray-400 text-xs mt-0.5">{order.phone}</div>
                            </td>
                            <td className="p-4 font-medium text-gray-900 vertical-top">{order.category}</td>
                            <td className="p-4 font-medium text-gray-900 vertical-top">${typeof order.price === 'number' ? order.price.toFixed(2) : order.price}</td>
                            <td className="p-4 text-gray-600 vertical-top">
                                {order.date instanceof Date
                                    ? order.date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')
                                    : order.date}
                            </td>
                            <td className="p-4 text-gray-600 vertical-top">{order.payment}</td>
                            <td className="p-4 vertical-top">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className={`px-3 py-1 rounded-md text-xs font-medium border-none outline-none cursor-pointer ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}
                                >
                                    <option value="New">New</option>
                                    <option value="Await">Await</option>
                                    <option value="On way">On way</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
