import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Loading from './loading/loading';
import Navbar from './navbar/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

function GlobalLayout() {
  const isLoading = useSelector((state) => state.loading.loading);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    <div className="relative min-h-screen w-screen max-w-full">
      <ToastContainer />
      {isLoading || isFetching || isMutating ? <Loading /> : null}
      <div className="max-container">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default GlobalLayout;
