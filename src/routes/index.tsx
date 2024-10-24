import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PrivateRouter from './PrivateRouter';
import PaymentPage from '../pages/admin/PaymentPage';
import OrderPage from '../pages/admin/OrderPage';
import BillPage from '../pages/admin/BillPage';

// UserPage
const User = lazy(() => import('../pages/user/User'));
const HomePage = lazy(() => import('../pages/user/HomePage'));
const CheckTicketPage = lazy(() => import('../pages/user/CheckTicketPage'));
const ReturnTicketPage = lazy(() => import('../pages/user/ReturnTicketPage'));
const ContactPage = lazy(() => import('../pages/user/ContactPage'));
const FlightsPage = lazy(() => import('../pages/user/FlightsPage'));
const BusPage = lazy(() => import('../pages/user/BusPage'));
const TrainsPage = lazy(() => import('../pages/user/TrainsPage'));
const TicketTrainsResultsPage = lazy(
  () => import('../pages/user/tickets-results/TicketTrainsResultsPage')
);
const TicketBusesResultsPage = lazy(
  () => import('../pages/user/tickets-results/TicketBusesResultsPage')
);
const TicketFlightsResultsPage = lazy(
  () => import('../pages/user/tickets-results/TicketFlightsResultsPage')
);
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
const SeatPage = lazy(() => import('../pages/admin/SeatPage'));
const AgePage = lazy(() => import('../pages/admin/AgePage'));
const ServicePage = lazy(() => import('../pages/admin/ServicePage'));
const VehicleCatalogPage = lazy(
  () => import('../pages/admin/VehicleCatalogPage')
);
const TicketCatalogPage = lazy(
  () => import('../pages/admin/TicketCatalogPage')
);
const TicketPage = lazy(() => import('../pages/admin/TicketPage'));
const SeatCatalogPage = lazy(() => import('../pages/admin/SeatCatalogPage'));
const TripPage = lazy(() => import('../pages/admin/TripPage'));
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
            <Route
              index
              path="ticket-buses-results"
              element={<TicketBusesResultsPage />}
            />
            <Route
              index
              path="ticket-flights-results"
              element={<TicketFlightsResultsPage />}
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
            <Route path="seat" element={<SeatPage />} />
            <Route path="age" element={<AgePage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="ticket" element={<TicketPage />} />
            <Route path="ticket-catalog" element={<TicketCatalogPage />} />
            <Route path="vehicle-catalog" element={<VehicleCatalogPage />} />
            <Route path="seat-catalog" element={<SeatCatalogPage />} />
            <Route path="trip" element={<TripPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="bill" element={<BillPage />} />
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
