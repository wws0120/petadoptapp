import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const MemberProtectedRoute = () => {
  const location = useLocation();
  const userAuth = useSelector((state) => state.auth);
  const isLogin = useMemo(() => {
    if (userAuth && userAuth.token) {
      return true;
    }

    return false;
  }, [userAuth]);

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default MemberProtectedRoute;
