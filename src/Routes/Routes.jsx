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
import ProfileHome from "../Pages/Profile/ProfileHome/ProfileHome";
import UpdateUser from "../Pages/Profile/UpdateUser/UpdateUser";
import AllPostedJob from "../Pages/Profile/PostJob/AllPostedJob";
import AddJob from "../Pages/Profile/PostJob/AddJob";
import PostedJobDetails from "../Pages/Profile/PostJob/PostedJobDetails";
import UpdateJob from "../Pages/Profile/PostJob/UpdateJob";
import ShowAllJobs from "../Dashboard/Alljobs/ShowAllJobs";
import JobListing from "../Pages/JobListing/JobListing";
import JobDetails from "../Pages/JobDetails/JobDetails";
import DashHome from "../Dashboard/DashBoardHome/DashHome";
import AllUser from "../Dashboard/AllUser/AllUser";

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
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/jobDetails/:id",
        element: <JobDetails />
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/profile",
            element: <ProfileHome />,
          },
          {
            path: "/profile/update",
            element: <UpdateUser />,
          },
          {
            path: "/profile/all-job",
            element: <AllPostedJob />,
          },
          {
            path: "/profile/add-job",
            element: <AddJob />,
          },
          {
            path: "/profile/details/:id",
            element: <PostedJobDetails />,
          },
          {
            path: "/profile/updateJobs/:id",
            element: <UpdateJob />,
          },
        ],
      },
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
    element: <PrivateRoute><DashboardLayouts /></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <DashHome />,
      },
      {
        path: "/dashboard/all-jobs",
        element: <ShowAllJobs />,
      },
      {
        path: "/dashboard/all-user",
        element: <AllUser />
      }
    ],
  },
]);
