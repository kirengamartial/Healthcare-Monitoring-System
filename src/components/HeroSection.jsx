import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import authService from '../services/authService'; // Import authService

const HeroSection = () => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();
  
  // Function to determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch (user.role) {
      case 'doctor':
        return '/doctor/dashboard';
      case 'patient':
        return '/patient/dashboard';
      case 'nurse':
        return '/nurse/dashboard';
      case 'admin':
        return '/admin/users';
      default:
        return '/';
    }
  };
    
  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100 to-transparent opacity-50"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Advanced <span className="text-blue-600">Healthcare</span> Monitoring in Real-Time
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Empowering healthcare professionals with real-time patient data and analytics for better care delivery and improved outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              {!isAuthenticated ? (
                <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                  Get Started Free
                </Link>
              ) : (
                <Link to={getDashboardLink()} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                  Go to Dashboard
                </Link>
              )}
            </div>
            <div className="mt-8 flex items-center text-gray-600 text-sm">
              <Shield size={16} className="mr-2" />
              HIPAA Compliant & Secure
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl rotate-2"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-tr from-green-600/80 to-green-400/80 rounded-xl -rotate-2"></div>
              <div className="relative bg-white p-2 rounded-xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
                alt="Healthcare Dashboard"
                className="w-full h-auto object-cover rounded-lg"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;