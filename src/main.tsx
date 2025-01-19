import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from './views/login';
import Singup from './views/singup';
import Home from './views/homepage';
import Admin from './views/pageadmin';
import Forbidden from './views/forbiden';

import { PasswordRecovery } from './components/login/pswdrecovery';

// Helper function to check authentication
const isAuthenticated = (): boolean => {
  return localStorage.getItem('user') !== null;
};

// Define the type for the ProtectedRoute props
interface ProtectedRouteProps {
  element: JSX.Element; // The component to render if authenticated
  redirectTo: string;   // The path to redirect to if not authenticated
}

// ProtectedRoute component with typed props
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, redirectTo }) => {
  return isAuthenticated() ? element : <Navigate to={redirectTo} />;
};

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/singup" element={<Singup />} />
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute
            element={<Home />}
            redirectTo="/forbidden"
          />
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            element={<Admin />}
            redirectTo="/forbidden"
          />
        }
      />
      <Route
        path="/psw"
        element={
          <div className="flex min-h-svh flex-col items-center justify-center bg-muted">
            <div className="w-full max-w-sm md:max-w-3xl">
              <PasswordRecovery />
            </div>
          </div>
        }
      />
    </Routes>
  </Router>
);
