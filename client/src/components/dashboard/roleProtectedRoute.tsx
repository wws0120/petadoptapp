import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { staffChecker } from '../../utils/authUtils';

const RoleProtectedRoute = () => {
  const location = useLocation();
  //  const isStaff = await staffChecker();
  const isStaff = staffChecker();
  const content = isStaff ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};
export default RoleProtectedRoute;
