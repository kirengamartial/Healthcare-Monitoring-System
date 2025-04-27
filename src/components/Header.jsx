import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Menu, X, User, LogOut } from 'lucide-react';
import authService from '../services/authService'; // Update the path as needed

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };
  
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">HealthMonitor</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <div className="flex items-center space-x-8">
                <Link 
                  to={getDashboardLink()} 
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <div className="bg-blue-100 text-blue-600 h-8 w-8 rounded-full flex items-center justify-center mr-2">
                      {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-blue-600 hover:text-blue-700 transition">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Register
                </Link>
              </>
            )}
          </nav>
          
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center py-2">
                  <div className="bg-blue-100 text-blue-600 h-8 w-8 rounded-full flex items-center justify-center mr-2">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name || 'User'}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                <Link 
                  to={getDashboardLink()} 
                  className="block text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-600 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-blue-600 hover:text-blue-700 transition">Login</Link>
                <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;