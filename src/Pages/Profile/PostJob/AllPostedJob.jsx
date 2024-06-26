import React from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AllPostedJob() {
  const { user } = useAuth();
  const { data: jobs = [], refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get(`https://job-hunter-server-rust.vercel.app/jobs/${user?.email}`);
      return res.data;
    },
  });
  const jobDelete = id => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        refetch();
        axios.delete(`https://job-hunter-server-rust.vercel.app/jobs/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        toast.warn("Job Deleted Success");
      }
    });
  };
  return (
    <div className="p-5 bg-gray-100 rounded">
      <div className="pb-5 flex items-center justify-between">
        <h4 className="text-[18px] font-medium">AllPostedJob</h4>
        <Link
          to="/profile/add-job"
          className="px-5 py-2 bg-primary text-white rounded"
        >
          Add A Job
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Salary</th>
              <th>location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.jobTitle}</td>
                <td>{item?.companyName}</td>
                <td>{item?.maxPrice}k</td>
                <td>{item?.jobLocation}</td>
                <td className="flex items-center space-x-2">
                  <Link
                    to={`/profile/details/${item?._id}`}
                    className="text-[20px] w-[35px] h-[35px] rounded cursor-pointer flex items-center justify-center bg-primary text-white"
                  >
                    <FaEye />
                  </Link>
                  <Link
                    to={`/profile/updateJobs/${item?._id}`}
                    className="text-[20px] w-[35px] h-[35px] rounded cursor-pointer flex items-center justify-center bg-blue-600 text-white"
                  >
                    <FaPencilAlt />
                  </Link>
                  <span
                    onClick={() => jobDelete(item?._id)}
                    className="text-[20px] w-[35px] h-[35px] rounded cursor-pointer flex items-center justify-center bg-red-600 text-white"
                  >
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllPostedJob;
