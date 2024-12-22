import { createBrowserRouter, RouteObject } from "react-router-dom";
import AdminPage from "../modules/AdminPage";
import AnonymousPage from "../modules/AnonymousPage";
import ConfessionsPage from "../modules/ConfessionsPage";
import FallBackError from "../modules/FallBackError";
import LoginPage from "../modules/LoginPage";
import PageNotFound from "../modules/PageNotFound";
import SignUpPage from "../modules/SignUpPage";
import RequiredAuth from "../hooks/useAuth";
import LandingPage from "@/modules/LandingPage";
import AllConfessionsPage from "@/modules/AllConfessionsPage";
import AllMessagesPage from "@/modules/AllMessagesPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <FallBackError />,
  },
  {
    path: ":user/confessions",
    element: <ConfessionsPage />,
    errorElement: <FallBackError />,
  },
  {
    path: ":user/anonymous",
    element: <AnonymousPage />,
    errorElement: <FallBackError />,
  },
  {
    path: ":user/admin",
    element: (
      <RequiredAuth>
        <AdminPage />
      </RequiredAuth>
    ),
    errorElement: <FallBackError />,
  },
  {
    path: "*",
    element: <PageNotFound />,
    errorElement: <FallBackError />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <FallBackError />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <FallBackError />,
  },
  {
    path: ":user/admin/confessions",
    element: (
      <RequiredAuth>
        <AllConfessionsPage />
      </RequiredAuth>
    ),
    errorElement: <FallBackError />,
  },
  {
    path: ":user/admin/messages",
    element: (
      <RequiredAuth>
        <AllMessagesPage />
      </RequiredAuth>
    ),
    errorElement: <FallBackError />,
  },
];

export const router = createBrowserRouter(routes);
