import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { TeachersPage } from "./components/TeachersPage";
import { RoomsPage } from "./components/RoomsPage";
import { ConflictsPage } from "./components/ConflictsPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { LandingPage } from "./components/LandingPage";
import { SetupPage } from "./components/SetupPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/setup",
    element: (
      <ProtectedRoute>
        <SetupPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: <Navigate to="/app/dashboard" replace />,
  },
  {
    path: "/guru",
    element: <Navigate to="/app/guru" replace />,
  },
  {
    path: "/ruang",
    element: <Navigate to="/app/ruang" replace />,
  },
  {
    path: "/bentrok",
    element: <Navigate to="/app/bentrok" replace />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", Component: Dashboard },
      { path: "guru", Component: TeachersPage },
      { path: "ruang", Component: RoomsPage },
      { path: "bentrok", Component: ConflictsPage },
    ],
  },
]);