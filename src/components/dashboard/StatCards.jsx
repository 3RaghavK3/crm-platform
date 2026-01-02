import React from 'react';
import { Check, User } from 'lucide-react';

const StatCards = () => {
    return (
        <div className="p-4 flex space-x-4">
            <div className="flex-1 rounded-xl border p-6 flex flex-col justify-between shadow-lg h-full bg-white">
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
            <div className="flex-1 rounded-xl border p-6 flex flex-col justify-between shadow-lg h-full bg-white">
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
    );
};

export default StatCards;
