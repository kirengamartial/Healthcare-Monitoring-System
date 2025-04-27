import React from 'react'
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
    
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Transform Patient Monitoring?</h2>
      <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
        Join healthcare institutions worldwide that are leveraging our technology 
        for improved patient care and better medical decision making.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/register" className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg">
          Create Free Account
        </Link>
        <Link to="/contact" className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Contact Sales
        </Link>
      </div>
    </div>
  </section>
  )
}

export default CallToActionSection
