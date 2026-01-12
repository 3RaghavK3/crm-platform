import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const OrderStatCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                    {/* Top colored part */}
                    {/* Top colored part */}
                    <div className={`${stat.bg} p-4 relative overflow-hidden bg-opacity-50`}>
                        <div className="text-black text-xl font-medium relative z-10">{stat.title}</div>
                        {/* Decorative circles confined to header */}
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
                        <div className="absolute top-0 right-0 w-10 h-10 bg-white/10 rounded-full blur-md"></div>
                    </div>

                    {/* Bottom white part */}
                    <div className="p-6 flex flex-col justify-between flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="text-5xl font-bold text-gray-900">{stat.count}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderStatCards;
