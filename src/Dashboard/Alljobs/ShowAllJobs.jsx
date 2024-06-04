import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

function ShowAllJobs() {
  const { data: jobs = [], refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/jobs`);
      return res.data;
    },
  });
  const approveJob = id => {
    axios.put(`http://localhost:5000/jobs/${id}`);
    refetch();
    toast.success("Job is Approved");
  };
  return (
    <div className="bg-gray-100 p-5 rounded">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Job Tittle</th>
              <th>Company Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.jobTitle}</td>
                <td>{item?.companyName}</td>
                <td>{item?.status}</td>
                <td>
                  <span
                    onClick={() => approveJob(item?._id)}
                    className={`w-[35px] h-[35px] ${
                      item?.status === "approve" ? "bg-blue-600" : "bg-rose-600"
                    } flex items-center justify-center cursor-pointer text-white rounded`}
                  >
                    <FaCheck />
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

export default ShowAllJobs;
