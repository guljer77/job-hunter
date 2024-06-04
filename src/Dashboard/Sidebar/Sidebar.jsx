import React from "react";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoStatsChart } from "react-icons/io5";

function Sidebar() {
  return (
    <div>
      <h4 className="uppercase text-[26px] font-semibold text-white text-center py-10">
        JobHunter
      </h4>
      <hr />
      <div className="pt-5 pl-10">
        <ul>
          <li className="text-[18px] font-medium text-white flex items-center mb-2">
            <NavLink to="/dashboard" className={({isActive})=> isActive ? "bg-gray-100 w-3/4 pl-3 py-[6px] rounded text-primary":""}><span className="flex items-center gap-1"><MdDashboard /> Dashboard</span></NavLink>
          </li>
          <li className="text-[18px] font-medium text-white flex items-center mb-2">
            <NavLink to="/dashboard/all-jobs" className={({isActive})=> isActive ? "bg-gray-100 w-3/4 pl-3 py-[6px] rounded text-primary":""}><span className="flex items-center gap-1"><IoStatsChart />All Jobs</span></NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
