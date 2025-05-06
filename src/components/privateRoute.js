import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, requiredNivel = 1 }) => {
  const { isAuthenticated, operador, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (operador?.nivel < requiredNivel) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;