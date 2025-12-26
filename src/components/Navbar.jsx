import React from 'react';
import { Search, Settings, Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-2/3">
        <Search className="w-5 h-5 text-black mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-gray-700 placeholder-gray-500 flex-2"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-200 rounded-md">
          <Settings className="w-5 h-5 text-black" />
        </button>
        <button className="p-2 bg-gray-200 rounded-md">
          <Bell className="w-5 h-5 text-black" />
        </button>
        <div className="p-2">
          <User className="w-6 h-6 text-black" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;