import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard/index.jsx";
import { requireAuth } from "./loaders/requireAuth";
import AppointmentPage from "../pages/appoinment/index.jsx";
import WorkflowBuilder from "../pages/workflow/index.jsx";
import Profile from "../pages/profile.jsx";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <MainLayout />,
    loader: requireAuth,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/appointment", element: <AppointmentPage /> },
      { path: "/workflow", element: <WorkflowBuilder /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
]);

export default router;
