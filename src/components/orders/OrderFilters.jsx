import React from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const OrderFilters = ({ filters, toggleFilter, clearFilters, totalOrders, filteredCount }) => {
    const [activeFilter, setActiveFilter] = React.useState(null);

    const categories = ['Laptops', 'Mobiles'];
    const statuses = ['New', 'Await', 'On way', 'Delivered'];

    const handleFilterClick = (filterType) => {
        setActiveFilter(activeFilter === filterType ? null : filterType);
    };

    return (
        <div className="flex items-center space-x-3 mb-6 relative">
            <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                <Filter className="w-4 h-4 text-gray-600" />
            </button>

            {/* Categories Filter Dropdown */}
            <div className="relative">
                <div
                    className={`flex items-center px-3 py-1 bg-white rounded-full shadow-sm text-sm cursor-pointer border ${filters.category.length > 0 ? 'border-indigo-200 text-indigo-700 bg-indigo-50' : 'border-transparent'}`}
                    onClick={() => handleFilterClick('category')}
                >
                    <span className="font-medium mr-2">Category {filters.category.length > 0 && `(${filters.category.length})`}</span>
                    <button className="text-gray-400 hover:text-gray-600">▼</button>
                </div>
                {activeFilter === 'category' && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-20 border border-gray-100 p-2">
                        {categories.map(cat => (
                            <div
                                key={cat}
                                className={`flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer ${filters.category.includes(cat) ? 'bg-indigo-50 text-indigo-700' : ''}`}
                                onClick={() => toggleFilter('category', cat)}
                            >
                                <input type="checkbox" checked={filters.category.includes(cat)} readOnly className="mr-2 rounded text-indigo-600 focus:ring-indigo-500" />
                                <span>{cat}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative">
                <div
                    className={`flex items-center px-3 py-1 bg-white rounded-full shadow-sm text-sm cursor-pointer border ${filters.status.length > 0 ? 'border-indigo-200 text-indigo-700 bg-indigo-50' : 'border-transparent'}`}
                    onClick={() => handleFilterClick('status')}
                >
                    <span className="font-medium mr-2">Status {filters.status.length > 0 && `(${filters.status.length})`}</span>
                    <button className="text-gray-400 hover:text-gray-600">▼</button>
                </div>
                {activeFilter === 'status' && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-20 border border-gray-100 p-2">
                        {statuses.map(stat => (
                            <div
                                key={stat}
                                className={`flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer ${filters.status.includes(stat) ? 'bg-indigo-50 text-indigo-700' : ''}`}
                                onClick={() => toggleFilter('status', stat)}
                            >
                                <input type="checkbox" checked={filters.status.includes(stat)} readOnly className="mr-2 rounded text-indigo-600 focus:ring-indigo-500" />
                                <span>{stat}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-indigo-600">Clear all</button>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{filteredCount} of {totalOrders}</span>
                <div className="flex space-x-1">
                    <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
};

export default OrderFilters;
