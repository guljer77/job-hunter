import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function DashHome() {
  const { user } = useAuth();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `https://job-hunter-server-rust.vercel.app/users/${user?.email}`
      );
      return res.data;
    },
  });
  return (
    <div className="bg-gray-100 rounded p-10">
      <div className="pb-5 flex items-center justify-between">
        <h4 className="text-[22px] uppercase font-semibold">
          Welcome to <span className="text-primary">{users?.name} Admin</span>
        </h4>
      </div>
      <h4 className="text-[16px] pb-2 uppercase font-medium">
        Name: {users?.name}
      </h4>
      <h4 className="pb-2 text-[15px] font-light">Email: {users?.email}</h4>
      <h4 className="pb-2 text-[15px] font-light">Age: {users?.age}</h4>
      <h4 className="pb-2 text-[15px] font-light">Phone: {users?.phone}</h4>
      <img src={users?.img} alt="" className="w-[140px] h-[140px]" />
    </div>
  );
}

export default DashHome;
