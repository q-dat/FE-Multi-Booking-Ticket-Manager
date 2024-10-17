import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../context/auth/AuthContext';

interface AdminRouteProps {
  children: ReactNode;
}

const PrivateRouter = ({ children }: AdminRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isPageLoaded, setIsPageLoaded] = useState(true);

  // Sử dụng useEffect để kiểm tra user role và điều hướng
  useEffect(() => {
    // Khôi phục đường dẫn từ localStorage khi trang được tải lại
    if (isPageLoaded && user?.role === 'admin') {
      const savedPath = localStorage.getItem('adminCurrentPath');
      if (savedPath && savedPath !== location.pathname) {
        navigate(savedPath, { replace: true });
      }
    }
    setIsPageLoaded(false);
  }, [navigate, location.pathname, user?.role, isPageLoaded]);

  // Lưu đường dẫn hiện tại vào localStorage khi admin chuyển trang
  useEffect(() => {
    if (user?.role === 'admin' && !isPageLoaded) {
      localStorage.setItem('adminCurrentPath', location.pathname);
    }
  }, [location.pathname, user?.role, isPageLoaded]);

  // Điều hướng nếu user không hợp lệ
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRouter;
