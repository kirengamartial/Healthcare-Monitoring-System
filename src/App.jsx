import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DoctorLayout from "./components/shared/DoctorLayout";
import PatientLayout from "./components/shared/PatientLayout";
import AdminLayout from "./components/shared/AdminLayout";
import Dashboard from "./pages/doctor/Dashboard";
import PatientsPage from "./pages/doctor/PatientsPage";
import PatientDetails from "./pages/doctor/PatientDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import AnalyticsPage from "./pages/doctor/AnalyticsPage";
import CalendarPage from "./pages/doctor/CalendarPage";
import SettingsPage from "./pages/doctor/SettingsPage";
import HomePage from "./pages/HomePage";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";
import RoleBasedRedirect from "./components/auth/RoleBasedRedirect";
import NurseDashboard from "./pages/nurse/NurseDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NurseLayout from "./components/shared/NurseLayout";
import CalendarNursePage from "./pages/nurse/CalendarNursePage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";


const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/doctor" element={
          <RoleBasedRoute requiredRoles={["doctor"]}>
            <DoctorLayout />
          </RoleBasedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="patients/:id" element={<PatientDetails />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route index element={<Navigate to="/doctor/dashboard" />} />
        </Route>
        
        <Route path="/patient" element={
          <RoleBasedRoute requiredRoles={["patient"]}>
            <PatientLayout />
          </RoleBasedRoute>
        }>
          <Route path="dashboard" element={<PatientDashboard/>} />
          <Route path="settings" element={<SettingsPage/>} />
          <Route index element={<Navigate to="/patient/dashboard" />} />
        </Route>

        <Route path="/nurse" element={
          <RoleBasedRoute requiredRoles={["nurse"]}>
            <NurseLayout />
          </RoleBasedRoute>
        }>
          <Route path="dashboard" element={<NurseDashboard/>} />
          <Route path="calendar" element={<CalendarNursePage />} />
          <Route path="settings" element={<SettingsPage/>} />
          <Route index element={<Navigate to="/nurse/dashboard" />} />
        </Route>

        <Route path="/admin" element={
          <RoleBasedRoute requiredRoles={["admin"]}>
            <AdminLayout />
          </RoleBasedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard/>} />
          <Route path="users" element={<AdminUsersPage/>} />
          <Route path="settings" element={<SettingsPage/>} />
          <Route index element={<Navigate to="/admin/dashboard" />} />
        </Route>
        
        <Route path="/home" element={<RoleBasedRedirect />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;