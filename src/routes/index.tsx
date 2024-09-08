// routes viết trong này, dùng lazy load đi kèm
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import DashboardPage from "../pages/admin/DashboardPage";

// User page
const User = lazy(() => import("../pages/user/User"));
const Home = lazy(() => import("../pages/user/Home"));
// admin
const Admin = lazy(() => import("../pages/admin/Admin"));

// not found page
const NotFound = lazy(() => import("../pages/404/NotFound"));
export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* User page  */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<User />}>
            <Route index path="" element={<Home />} />
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
