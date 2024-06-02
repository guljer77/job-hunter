import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import Sidebar from "../Dashboard/Sidebar/Sidebar";

function DashboardLayouts() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex items-start justify-between">
      <div className="bg-[#5AB2FF] lg:block hidden w-[20%] h-[100vh] z-50">
        <div className="fixed top-0 left-0 w-[20%] bg-[#5AB2FF] z-50">
          <Sidebar />
        </div>
      </div>
      <div className="lg:w-[80%] w-full">
        <div className="p-5 bg-gray-50 shadow-md flex items-center justify-between">
          <h4 className="text-[20px] font-semibold">Dashboard</h4>
          <div className="flex items-center space-x-2">
            <h4 className="text-[16px] font-medium uppercase">Guljer</h4>
            <span
              onClick={() => setOpen(!open)}
              className="text-[22px] lg:hidden block cursor-pointer"
            >
              {open ? (
                <IoMenu />
              ) : (
                <IoIosClose size={24} className="text-[24px]" />
              )}
            </span>
          </div>
        </div>
        {!open && (
          <div className="fixed top-0 bg-[#5AB2FF] left-0 h-screen w-[270px] z-50">
            <Sidebar />
          </div>
        )}
        <div className="lg:p-10 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayouts;
