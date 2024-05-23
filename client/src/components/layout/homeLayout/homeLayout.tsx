import Navbar from '../navbar/navbar';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default HomeLayout;
