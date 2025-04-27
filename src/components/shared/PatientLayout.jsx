import Header from "./Header";
import { Toaster } from "react-hot-toast";
import PatientSidebar from "./PatientSidebar";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-geist">
      <PatientSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-5 lg:p-8">
        <Outlet />
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#363636",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
            success: {
              duration: 5000,
              style: {
                background: "#10B981",
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#10B981",
              },
            },
            error: {
              duration: 6000,
              style: {
                background: "#EF4444",
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#EF4444",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PatientLayout;
