import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ _protected }: { _protected: number }) => {
  const { auth } = useAuth();
  const isAuthenticated = auth.token !== '';

  if (_protected === 1 && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (_protected === 0 && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
