import React from 'react'
import {  Activity, Heart, Shield, Users, Server, Award} from 'lucide-react';

const FeaturesSection = () => {
    
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Powerful Monitoring Features</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Our platform offers comprehensive tools for healthcare professionals to monitor and analyze patient health data in real-time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Activity className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Real-Time Monitoring</h3>
          <p className="text-gray-600">
            Monitor vital signs including heart rate, blood pressure, and glucose levels with instant updates and alerts.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="text-red-500" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Cardiac Analysis</h3>
          <p className="text-gray-600">
            Advanced ECG monitoring with trend analysis, rhythm detection, and early warning systems.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Secure Data Storage</h3>
          <p className="text-gray-600">
            End-to-end encrypted data transmission with HIPAA compliant storage and access controls.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Users className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Patient Management</h3>
          <p className="text-gray-600">
            Comprehensive patient profiles with medical history, medication tracking, and care plans.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <Award className="text-yellow-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
          <p className="text-gray-600">
            Predictive analytics using machine learning to forecast patient health trends and risks.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Server className="text-indigo-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-3">API Integration</h3>
          <p className="text-gray-600">
            Seamless connection with Withings API and other health data providers for comprehensive monitoring.
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default FeaturesSection
