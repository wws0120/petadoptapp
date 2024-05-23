import React, { lazy, Suspense } from 'react';
import './App.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Loading from './components/layout/loading/loading';
import 'react-image-crop/dist/ReactCrop.css';

//layouts
import GlobalLayout from './components/layout/globalLayout';
import HomeLayout from './components/layout/homeLayout/homeLayout';
import AccountLayout from './components/layout/accountLayout/accountLayout';
import DashboardLayout from './components/layout/dashboardLayout/dashboardLayout';

//root pages
const Home = lazy(() => import('./pages/home/home'));
const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));

const Animals = lazy(() => import('./pages/animals/animals'));
const AnimalInfo = lazy(() => import('./pages/animals/animalInfo'));
const AdoptionReceived = lazy(() => import('./pages/animals/adoptionReceived'));

const Events = lazy(() => import('./pages/event/events'));
const EventContent = lazy(() => import('./pages/event/eventContent'));

const DonateForm = lazy(() => import('./pages/donation/donateForm'));
const Success = lazy(() => import('./pages/donation/success'));
const Cancel = lazy(() => import('./pages/donation/cancel'));

//account pages
const FavoritePet = lazy(() => import('./pages/account/favoritePet'));
const MyProfile = lazy(() => import('./pages/account/myProfile'));
const MyDonation = lazy(() => import('./pages/account/myDonation'));
const MyAdoption = lazy(() => import('./pages/account/myAdoption'));
const MySetting = lazy(() => import('./pages/account/mySetting'));

//dashboard pages
const Dashboard = lazy(() => import('./pages/dashboard/dashboard'));

const AnimalList = lazy(() => import('./pages/dashboard/animalList'));
const AnimalEditCreate = lazy(() =>
  import('./pages/dashboard/animalEditCreate')
);
const EventList = lazy(() => import('./pages/dashboard/eventList'));
const EventEditCreate = lazy(() => import('./pages/dashboard/eventEditCreate'));

const DonationList = lazy(() => import('./pages/dashboard/donationList'));

const AdoptionList = lazy(() => import('./pages/dashboard/adoptionList'));
const AdoptionDetail = lazy(() => import('./pages/dashboard/adoptionDetail'));

const UserList = lazy(() => import('./pages/dashboard/userList'));
const UserDetail = lazy(() => import('./pages/dashboard/userDetail'));

// protected routes
const RoleProtectedRoute = lazy(() =>
  import('./components/dashboard/roleProtectedRoute')
);
const MemberProtectedRoute = lazy(() =>
  import('./components/account/memberProtectedRoute')
);

// 404 page
const NotFound = lazy(() => import('./pages/notFound'));

function App() {
  const queryClient = new QueryClient();

  const SuspenseLayout = () => (
    <React.Suspense fallback={<Loading />}>
      <Outlet />
    </React.Suspense>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<GlobalLayout />}>
          <Route element={<SuspenseLayout />}>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/animals" element={<Animals />} />
              <Route path="/animalinfo/:id" element={<AnimalInfo />} />
              <Route path="adoptionreceived" element={<AdoptionReceived />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:id" element={<EventContent />} />

              <Route path="/donation" element={<DonateForm />} />

              <Route path="payment/success" element={<Success />} />
              <Route path="payment/cancel" element={<Cancel />} />
            </Route>
            <Route element={<MemberProtectedRoute />}>
              <Route path="account" element={<AccountLayout />}>
                <Route path="favorite" element={<FavoritePet />} />
                <Route path="mysetting" element={<MySetting />} />
                <Route path="myprofile" element={<MyProfile />} />
                <Route path="mydonation" element={<MyDonation />} />
                <Route path="myadoption" element={<MyAdoption />} />
              </Route>
            </Route>
            <Route element={<RoleProtectedRoute />}>
              <Route path="dashboard" element={<DashboardLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="donationlist" element={<DonationList />} />
                <Route path="userlist" element={<UserList />} />
                <Route path="userdetail/:id" element={<UserDetail />} />
                <Route path="animallist" element={<AnimalList />} />
                <Route path="animaledit/:id" element={<AnimalEditCreate />} />
                <Route path="animalcreate" element={<AnimalEditCreate />} />

                <Route path="adoptionlist" element={<AdoptionList />} />
                <Route path="adoptiondetail/:id" element={<AdoptionDetail />} />

                <Route path="eventlist" element={<EventList />} />
                <Route path="eventedit/:id" element={<EventEditCreate />} />
                <Route path="eventcreate" element={<EventEditCreate />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
