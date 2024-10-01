import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: ReactNode;
}

const PrivateRouter = ({ children }: AdminRouteProps) => {
  const { user } = useAuth();

  console.log('Current Role:', user?.role);

  // Nếu không phải là admin chuyển sang trang 404
  if (user?.role !== 'admin') {
    return <Navigate to="*" replace />;
  }

  // Nếu là admin, cho phép truy cập vào trang admin
  return <>{children}</>;
};

export default PrivateRouter;
