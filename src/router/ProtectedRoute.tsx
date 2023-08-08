import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ _protected }: { _protected: number }) => {
  const { auth } = useAuth();
  const isAuthenticated = auth.token !== '';
  const location = useLocation();

  if (_protected === 1 && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (_protected === 0 && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
