import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Notice from '../components/Notice';
import RevenueGraph from '../components/dashboard/RevenueGraph';
import SalesCategoryChart from '../components/dashboard/SalesCategoryChart';
import StatCards from '../components/dashboard/StatCards';


const Dashboard = () => {

  return (
    <div className={`display flex h-screen`}>
      <Sidebar />
      <div className="flex-1 flex flex-col p-6">
        <Navbar />
        <Notice />
        <div className="grid grid-cols-2 grid-rows-2 gap-3 h-screen">
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

          <RevenueGraph />


          <StatCards />
          <SalesCategoryChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;