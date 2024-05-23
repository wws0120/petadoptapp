import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

export const loginChecker = () => {
  const userAuth = useSelector((state) => state.auth);

  if (userAuth && userAuth.token) {
    return true;
  }

  return false;
};

export const staffChecker = () => {
  const userAuth = useSelector((state) => state.auth);
  if (userAuth && userAuth.token) {
    const decode = jwtDecode(userAuth.token);

    if (decode.role === 'ADMIN' || decode.role === 'MANAGEMENT') {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
