import React from 'react';
import { LayoutDashboard, Users, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { id: 'customers', icon: Users, label: 'Customers', path: '/customers' },
  ];

  return (
    <div className="bg-white h-screen flex flex-col shadow-lg items-center group w-20 hover:w-64 transition-all duration-300 z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 overflow-hidden whitespace-nowrap">
          CRM
        </h1>
      </div>
      <nav className="flex-1 px-4 w-full">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <li key={item.id}>
                <div
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center cursor-pointer p-3 rounded-lg transition-colors duration-200 overflow-hidden whitespace-nowrap ${isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-indigo-600'
                    }`}
                >
                  <Icon className="w-6 h-6 min-w-[24px]" />
                  <div className="ml-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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