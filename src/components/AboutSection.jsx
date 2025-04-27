import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
    
  return (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                alt="Medical professionals using technology" 
                className="rounded-xl shadow-xl"
              />
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">About The Project</h2>
              <p className="text-gray-700 mb-6">
                The Real-Time Healthcare Monitoring System was developed by a team of talented 
                students from the University of Rwanda as part of their Grid Computing course. 
                Our platform leverages dynamic data from external APIs to provide real-time health metrics.
              </p>
              <p className="text-gray-700 mb-6">
                By shifting from reliance on physical IoT devices to API-based data sources, we've 
                created a more cost-effective and scalable solution accessible to healthcare facilities 
                of all sizes.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-1">Frontend</div>
                  <div className="text-gray-700">React.js with Tailwind CSS</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-1">Backend</div>
                  <div className="text-gray-700">Node.js with Express</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-1">Database</div>
                  <div className="text-gray-700">MongoDB</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-1">Communication</div>
                  <div className="text-gray-700">WebSockets</div>
                </div>
              </div>
              
              <Link to="/about" className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-8">
                <span className="mr-2">Learn more about our project</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
  )
}

export default AboutSection
