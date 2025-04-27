import { Navigate } from "react-router-dom";
import authService from "../../services/authService";

const RoleBasedRoute = ({ requiredRoles, children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/home" />;
  }
  
  return children;
};

export default RoleBasedRoute;