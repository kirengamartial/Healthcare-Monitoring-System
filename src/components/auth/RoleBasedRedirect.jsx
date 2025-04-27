import { Navigate } from "react-router-dom";
import authService from "../../services/authService";

const RoleBasedRedirect = () => {
  const user = authService.getUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  switch (user.role) {
    case 'doctor':
      return <Navigate to="/doctor/dashboard" />;
    case 'patient':
      return <Navigate to="/patient/appointments" />;
    case 'admin':
      return <Navigate to="/admin/users" />;
    default:
      return <Navigate to="/" />;
  }
};

export default RoleBasedRedirect;