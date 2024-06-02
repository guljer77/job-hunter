import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../Hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";
import Container from "../../Components/Container";

function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>Job Hunter | Profile</title>
      </Helmet>
      <Container>
        <div className="py-10">
          <div className="lg:flex items-start justify-between">
            <div className="lg:w-1/4 w-full bg-gray-200 rounded">
              <div className="py-5">
                <img
                  src={user?.photoURL}
                  alt=""
                  className="mx-auto w-[80px] h-[80px] rounded-full"
                />
              </div>
              <hr className="border border-primary" />
              <div className="py-5">
                <ul className="">
                  <li className="py-2 bg-primary/10 mb-1 text-[16px] font-medium uppercase">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                    >
                      <span className="pl-8">Profile</span>
                    </NavLink>
                  </li>
                  <li className="py-2 bg-primary/10 mb-1 text-[16px] font-medium uppercase">
                    <NavLink
                      to="/profile/applied-jobs"
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                    >
                      <span className="pl-8">Applied Jobs</span>
                    </NavLink>
                  </li>
                  <li className="py-2 bg-primary/10 mb-1 text-[16px] font-medium uppercase">
                    <NavLink
                      to="/profile/post-a-job"
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                    >
                      <span className="pl-8">Post A Jobs</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-3/4 w-full ml-10">
              <Outlet />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
