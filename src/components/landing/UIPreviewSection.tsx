
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const UIPreviewSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            Elegant Interface for Better Health Tracking
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our clean, intuitive dashboard helps you visualize your health data at a glance.
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-xl bg-white shadow-2xl border border-gray-200">
            {/* Dashboard Preview */}
            <div className="bg-sypher-blue-dark p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-white">Sypher Dashboard</div>
              <div className="w-16"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
              <div className="col-span-1 bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Health Score</h3>
                  <span className="text-sypher-blue-accent">86%</span>
                </div>
                <div className="h-32 rounded-lg bg-gradient-to-r from-sypher-blue to-sypher-blue-accent flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-sypher-blue-dark">86</span>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Weekly Activity</h3>
                  <span className="text-green-500 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" /> On Track
                  </span>
                </div>
                <div className="h-32 w-full flex items-end justify-between px-4">
                  {[35, 45, 30, 60, 75, 50, 40].map((height, i) => (
                    <div key={i} className="relative h-full flex flex-col items-center">
                      <div 
                        className="w-8 bg-sypher-blue-accent opacity-80 rounded-t-sm" 
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UIPreviewSection;
