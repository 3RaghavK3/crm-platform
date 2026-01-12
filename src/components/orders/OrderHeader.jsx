import React from 'react';
import { Settings, Bell, User } from 'lucide-react';

const OrderHeader = () => {
    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Order list</h1>
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
    );
};

export default OrderHeader;
