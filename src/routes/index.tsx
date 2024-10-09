import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PrivateRouter from './PrivateRouter';


// UserPage
const User = lazy(() => import('../pages/user/User'));
const HomePage = lazy(() => import('../pages/user/HomePage'));
const CheckTicketPage = lazy(() => import('../pages/user/CheckTicketPage'));
const ReturnTicketPage = lazy(() => import('../pages/user/ReturnTicketPage'));
const ContactPage = lazy(() => import('../pages/user/ContactPage'));
const FlightsPage = lazy(() => import('../pages/user/FlightsPage'));
const BusPage = lazy(() => import('../pages/user/BusPage'));
const TrainsPage = lazy(() => import('../pages/user/TrainsPage'));
const TicketTrainsResultsPage = lazy(() => import('../pages/user/TicketTrainsResultsPage'));
//auth
const Auth = lazy(() => import('../pages/auth/Auth'));
const SignUpPage = lazy(() => import('../pages/auth/SignUpPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

// admin
const Admin = lazy(() => import('../pages/admin/Admin'));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const LocationPage = lazy(() => import('../pages/admin/LocationPage'));
const BlogPage = lazy(() => import('../pages/admin/BlogPage'));
const VehiclePage = lazy(() => import('../pages/admin/VehiclePage'));
// not found page
const NotFound = lazy(() => import('../pages/404/NotFound'));
export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* User page  */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<User />}>
            <Route index path="" element={<HomePage />} />
            <Route index path="buses" element={<BusPage />} />
            <Route index path="flights" element={<FlightsPage />} />
            <Route index path="trains" element={<TrainsPage />} />
            <Route
              index
              path="ticket-trains-results"
              element={<TicketTrainsResultsPage />}
            />
            <Route path="check-ticket" element={<CheckTicketPage />} />
            <Route path="return-ticket" element={<ReturnTicketPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Route>

        {/* Auth  */}
        <Route element={<DefaultLayout />}>
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignUpPage />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<DefaultLayout />}>
          <Route
            path="/admin"
            element={
              <PrivateRouter>
                <Admin />
              </PrivateRouter>
            }
          >
            <Route index path="" element={<DashboardPage />} />
            <Route path="location" element={<LocationPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="vehicle" element={<VehiclePage />} />
          </Route>
        </Route>
        {/* 404 not found */}
        <Route element={<DefaultLayout />}>
          <Route errorElement={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
