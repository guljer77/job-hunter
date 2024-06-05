import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function AllUser() {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `https://job-hunter-server-rust.vercel.app/users`
      );
      return res.data;
    },
  });
  console.log(users);
  return (
    <div className="bg-gray-100 rounded p-10">
      <h4 className="text-[26px] pb-5 font-semibold">All User</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUser;
