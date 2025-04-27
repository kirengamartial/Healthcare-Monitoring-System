import React from 'react'
import {  Activity, Heart, Server, Award} from 'lucide-react';

const KeyMetrics = () => {
    
  return (
    <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <Heart size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Heart Rate</p>
              <h3 className="text-2xl font-bold">97 BPM</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-red-500 text-white p-3 rounded-lg">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Blood Pressure</p>
              <h3 className="text-2xl font-bold">125/75</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 text-white p-3 rounded-lg">
              <Award size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Temperature</p>
              <h3 className="text-2xl font-bold">98.7°F</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-green-600 text-white p-3 rounded-lg">
              <Server size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Glucose Level</p>
              <h3 className="text-2xl font-bold">132 mg/dL</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default KeyMetrics
