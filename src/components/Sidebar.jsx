import React, { useState } from 'react';
import { LayoutDashboard, Users, ShoppingCart } from 'lucide-react';

const Sidebar = () => {
  const [active, setActive] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
  ];

  return (
    <div className="bg-white h-screen flex flex-col shadow-lg items-center group">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          CRM
        </h1>
      </div>
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <div
                  onClick={() => setActive(item.id)}
                  className={`w-full flex items-center justify-center cursor-pointer p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Icon className="w-6 h-6 " />
                  <div className="ml-3 font-medium hidden group-hover:block transition-opacity duration-200">
                    {item.label}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;