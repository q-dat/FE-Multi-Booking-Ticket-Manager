// routes viết trong này, dùng lazy load đi kèm
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";

// admin
const Admin = lazy(() => import("../pages/admin/Admin"));
// landing page
const LandingPage = lazy(() => import("../pages/LandingPage"));

// not found page
const NotFound = lazy(() => import("../pages/404/NotFound"));
export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Landing page  */}
        <Route element={<DefaultLayout />}>
          <Route index path="/" element={<LandingPage />} />
        </Route>

        {/* Admin */}

        <Route element={<DefaultLayout />}>
          <Route path="/admin" element={<Admin />}>
            {/* <Route index path="" element={<DashboardPage />} />
            <Route path="chat" element={<ChatPage />} /> */}
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
