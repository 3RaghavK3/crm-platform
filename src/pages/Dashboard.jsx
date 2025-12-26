import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Notice from '../components/Notice';
import { Check, User } from 'lucide-react';


const Dashboard = () => {
  
  return (
    <div className={`display flex h-screen`}>
      <Sidebar />
      <div className="flex-1 flex flex-col p-6">
        <Navbar />
        <Notice/>
        <div className="grid grid-cols-2 grid-rows-2 gap-6 p-3 h-screen">
          <div className="p-4 text-left grid grid-cols-2 grid-rows-2 gap-2">
            <div className="p-3 pb-6 rounded-xl border text-left bg-white shadow-lg flex flex-col justify-between">
              <div className="text-lg ">Total revenue</div>
              <div className="text-4xl font-semibold">$10,000</div>
            </div>
            <div className="p-3 pb-6 rounded-xl border text-left bg-white shadow-lg flex flex-col justify-between">
              <div className="text-lg">Total orders</div>
              <div className="text-4xl font-semibold">150</div>
            </div>
            <div className="p-3 pb-6 rounded-xl border text-left bg-white shadow-lg flex flex-col justify-between">
              <div className="text-lg">Total visitors</div>
              <div className="text-4xl font-semibold ">2,500</div>
            </div>
            <div className="p-3 pb-6 rounded-xl border text-left bg-white shadow-lg flex flex-col justify-between">
              <div className="text-lg">Net profit</div>
              <div className="text-4xl font-semibold">$2,000</div>
            </div>
          </div>
          <div className="p-4  border text-left bg-white shadow-lg">
            Grid 2
          </div>
          <div className="p-4 flex space-x-4">
            <div className="flex-1 rounded-xl border p-6 flex flex-col justify-between shadow-lg">
              <div className="self-start">
                <button className="p-3 bg-gray-200 rounded-full">
                  <Check className="w-8 h-8 text-black" />
                </button>
              </div>
              <div className="justify-end">
                <div className="mb-2">
                  <span className="text-7xl font-semibold">87</span> <span className="text-4xl">customers</span>
                </div>
                <div className="text-xl word-wrap">
                  have <span className="text-orange-500">awaiting</span> order
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-xl border p-6 flex flex-col justify-between shadow-lg">
              <div className="self-start">
                <button className="p-3 bg-gray-200 rounded-full">
                  <User className="w-8 h-8 text-black" />
                </button>
              </div>
              <div className="justify-end">
                <div className="mb-2">
                  <span className="text-7xl font-semibold">31</span> <span className="text-4xl">customers</span>
                </div>
                <div className="text-xl word-wrap">
                  are <span className="text-orange-500">awaiting</span> for response
                </div>
              </div>
            </div>
          </div>
          <div className="p-4  border text-left bg-white shadow-lg">
            Grid 4
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;