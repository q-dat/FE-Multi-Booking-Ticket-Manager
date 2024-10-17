import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/auth/AuthContext';

interface AdminRouteProps {
  children: ReactNode;
}

const PrivateRouter = ({ children }: AdminRouteProps) => {
  const { user } = useAuth();

  console.log('Current Role:', user?.role);

  if (user?.role !== 'admin') {
    return <Navigate to=" " replace />;
  }

  return <>{children}</>;
};

export default PrivateRouter;
