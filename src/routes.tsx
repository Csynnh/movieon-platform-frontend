import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./views/AuthLayout";
import Login from "./views/login/Login";
import MainLayout from "./views/MainLayout.js";

const AboutView = lazy(async () => import("./views/about/AboutView"));
const HomeView = lazy(async () => import("./views/home/HomeView"));
const ProtectedRoute = lazy(async () => import("./views/admin/ProtectedRoute"));
const Dashboard = lazy(async () => import("./views/admin/Dashboard"));
const SignInAdmin = lazy(async () => import("./views/admin/SignInTenant"));
const Admin = lazy(async () => import("./views/admin/Admin"));
const PopCorn = lazy(async () => import("./views/popcorn/PopCorn"));

const CheckOut = lazy(async () => import("./views/checkout/CheckOut"));
const SignUpUser = lazy(async () => import("./views/signUpUser/SignUpUser"));

const MovieDetail = lazy(async () => import("./views/movieDetail/MovieDetail"));

export const routes = [
  {
    element: <MainLayout />,
    handle: { title: "Main" },
    children: [
      {
        path: "/",
        element: <HomeView />,
        handle: { title: "Home" },
      },

      {
        path: "/about",
        element: <AboutView />,
        handle: { title: "Thông tin rạp" },
      },

      {
        path: "/checkout",
        element: <CheckOut />,
        handle: { title: "CheckOut" },
      },
      {
        path: "/popcorn",
        element: <PopCorn />,
        handle: { title: "Buy Popcorn" },
      },
      {
        path: "/movie/:movieId/:date/:cinemaId",
        element: <MovieDetail />,
        handle: { title: "Movie Detail" },
      },

      {
        path: "/admin/login",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
        handle: { title: "ADMIN" },
      },
    ],
  },

  {
    element: <AuthLayout />,
    handle: { title: "Auth" },
    children: [
      {
        path: "/signup",
        element: <SignUpUser />,
        handle: { title: "Sign Up" },
      },
      {
        path: "/signin",
        element: <Login />,
        handle: { title: "Login Movieon" },
      },

      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        handle: { title: "Dashboard" },
      },
    ],
  },
  {
    path: "/admin/signin",
    element: <SignInAdmin />,
    handle: { title: "Sign In" },
  },
] as any;

export default createBrowserRouter(routes);
