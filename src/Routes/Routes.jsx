import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Error from "../Pages/ErrorPage/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import DashboardLayouts from "../Layouts/DashboardLayouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
        children:[
          {
            path: "/profile/add-job",
            element: "welcome"
          }
        ]
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayouts />
  }
]);
