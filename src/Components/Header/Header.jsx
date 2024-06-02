import React, { useState } from "react";
import Container from "../Container";
import { Link, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { FaArrowRightLong, FaRightToBracket } from "react-icons/fa6";
import { FaSortDown } from "react-icons/fa";
import { useAuth } from "../../Hooks/useAuth";

function Header() {
  const { user, logOutUser } = useAuth();
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  // const { data: users = [], refetch } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await axios.get(`http://localhost:5000/users/${user?.email}`);
  //     return res.data;
  //   },
  // });
  const handleLogout = () => {
    logOutUser()
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="py-5 bg-white shadow-lg">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Link className="lg:text-[30px] text-[24px] font-bold text-primary">
                JobHunter
              </Link>
            </div>
            <div className="lg:hidden block">
              <span onClick={() => setMenu(!menu)} className="">
                {menu ? (
                  <IoIosClose className="inline-block text-[28px]" />
                ) : (
                  <IoMenu className="inline-block text-[24px]" />
                )}
              </span>
            </div>
            <div className="lg:block hidden">
              <div className="flex items-center justify-between space-x-3">
                <ul className="flex items-center space-x-7">
                  <li className="text-[16px] font-medium uppercase">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="text-[16px] font-medium uppercase">
                    <NavLink
                      to="/jobs"
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                    >
                      Jobs
                    </NavLink>
                  </li>
                  <li className="text-[16px] font-medium uppercase">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="text-[16px] font-medium uppercase">
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
                <div className="">
                  <Link
                    to="/profile/add-job"
                    className="text-[16px] text-white rounded font-semibold bg-primary px-5 py-3"
                  >
                    Post A Job <FaArrowRightLong className="inline-block" />
                  </Link>
                </div>
                {user && (
                  <div className="border border-gray-300 rounded cursor-pointer px-2 py-[5px]">
                    {user ? (
                      <div
                        onClick={() => setProfile(!profile)}
                        className="flex items-center gap-1"
                      >
                        <img
                          src={user?.photoURL}
                          alt=""
                          className="w-[40px] h-[40px] rounded-full"
                        />
                        <span>
                          <FaSortDown />
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                {profile && (
                  <div className="absolute top-[72px] w-[130px] h-[100px] rounded z-50 right-20 bg-gray-50 shadow-md p-3">
                    <a href="/profile" className="text-primary py-2 block">
                      Profile
                    </a>
                    <a
                      href=""
                      onClick={handleLogout}
                      className="px-3 py-[6px] bg-primary text-white rounded"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      {menu && (
        <div className="top-[77px] z-50 left-0 absolute bg-white shadow-md w-full h-auto">
          <ul className="flex flex-col items-start space-y-3 pt-5 pl-5 pb-5">
            <li className="text-[14px] font-medium uppercase">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-primary" : "")}
              >
                Home
              </NavLink>
            </li>
            <li className="text-[14px] font-medium uppercase">
              <NavLink
                to="/jobs"
                className={({ isActive }) => (isActive ? "text-primary" : "")}
              >
                Jobs
              </NavLink>
            </li>
            <li className="text-[14px] font-medium uppercase">
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "text-primary" : "")}
              >
                About
              </NavLink>
            </li>
            <li className="text-[14px] font-medium uppercase">
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "text-primary" : "")}
              >
                Contact
              </NavLink>
            </li>
            <li className="pb-2 pt-2">
              <Link
                to="/profile/add-job"
                className="text-[16px] text-white rounded font-semibold bg-primary px-5 py-3"
              >
                Post A Job <FaArrowRightLong className="inline-block" />
              </Link>
            </li>
            {user && (
              <div className="flex items-center space-x-3">
                <div>
                  {user ? (
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {user && (
                    <span
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer gap-1 text-[16px] font-semibold"
                    >
                      Logout <FaRightToBracket className="inline-block" />
                    </span>
                  )}
                </div>
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
