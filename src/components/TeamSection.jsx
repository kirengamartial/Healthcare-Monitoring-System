import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TeamSection = () => {
    
  return (
    <section className="py-20 bg-blue-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          A talented group of students from the University of Rwanda passionate about healthcare technology.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 font-bold text-xl">MK</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">Martial KIRENGA</h3>
          <p className="text-blue-600 mb-3">Team Lead</p>
          <p className="text-gray-600 text-sm">Responsible for project coordination and team management.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 font-bold text-xl">LU</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">Libertha UWIMANA</h3>
          <p className="text-blue-600 mb-3">Frontend Developer</p>
          <p className="text-gray-600 text-sm">Expert in React.js and frontend architecture.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 font-bold text-xl">IS</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">Irene SHINGIRO</h3>
          <p className="text-blue-600 mb-3">Backend Developer</p>
          <p className="text-gray-600 text-sm">Specializes in Node.js and API development.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-purple-600 font-bold text-xl">AN</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">Alain NIGANZE</h3>
          <p className="text-blue-600 mb-3">UI/UX Designer</p>
          <p className="text-gray-600 text-sm">Creates intuitive user interfaces and experiences.</p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Link to="/team" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <span className="mr-2">View all team members</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
  )
}

export default TeamSection
