import React from 'react';
import { Search, Download, SlidersHorizontal, Plus } from 'lucide-react';

const OrderActions = ({ searchTerm, setSearchTerm, sortConfig, handleSortChange, totalOrders }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4 flex-1">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border-none focus:ring-2 focus:ring-indigo-500 shadow-sm outline-none"
                    />
                </div>
                <span className="text-gray-500 text-sm font-medium">{totalOrders} orders</span>
            </div>

            <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                </button>
                <div className="relative group inline-block">
                    <button className="flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Sort: {sortConfig.key ? `${sortConfig.key} (${sortConfig.direction})` : 'Default'}
                    </button>
                    {/* Invisible bridge to prevent menu from closing */}
                    <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>

                    {/* Sort Dropdown */}
                    <div className="absolute right-0 top-[calc(100%+8px)] w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-20 border border-gray-100">
                        <div className="py-1">
                            <button onClick={() => handleSortChange('price')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Price</button>
                            <button onClick={() => handleSortChange('date')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Date</button>
                        </div>
                    </div>
                </div>

                <button className="flex items-center px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add order
                </button>
            </div>
        </div>
    );
};

export default OrderActions;
