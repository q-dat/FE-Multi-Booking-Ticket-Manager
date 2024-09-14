import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';

// UserPage
const User = lazy(() => import('../pages/user/User'));
const Home = lazy(() => import('../pages/user/Home'));
const CheckTicket = lazy(() => import('../pages/user/CheckTicket'));
const ReturnTicketPage = lazy(() => import('../pages/user/ReturnTicketPage'));
//auth
const Auth = lazy(() => import('../pages/auth/Auth'));
const SignUpPage = lazy(() => import('../pages/auth/SignUpPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

// admin
const Admin = lazy(() => import('../pages/admin/Admin'));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
// not found page
const NotFound = lazy(() => import('../pages/404/NotFound'));
export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* User page  */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<User />}>
            <Route index path="" element={<Home />} />
            <Route index path="check-ticket" element={<CheckTicket />} />
            <Route index path="return-ticket" element={<ReturnTicketPage />} />
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
          <Route path="/admin" element={<Admin />}>
            <Route index path="" element={<DashboardPage />} />
            {/* <Route path="chat" element={<ChatPage />} /> */}
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

