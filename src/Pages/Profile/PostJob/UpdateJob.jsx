import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateJob() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { data: jobs = [], refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get(`https://job-hunter-server-rust.vercel.app/jobs/${user?.email}`);
      return res.data;
    },
  });
  const filterData = jobs?.find(item => item?._id === id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    const {
      jobTitle,
      companyName,
      minPrice,
      maxPrice,
      salaryType,
      jobLocation,
      postingDate,
      experienceLevel,
      employmentType,
      description,
    } = data;
    const jobInfo = {
      jobTitle,
      companyName,
      minPrice,
      maxPrice,
      salaryType,
      jobLocation,
      postingDate,
      experienceLevel,
      employmentType,
      description,
    };
    axios.patch(`https://job-hunter-server-rust.vercel.app/jobs/${id}`, jobInfo);
    toast.success("Job Update Success");
    navigate("/profile/all-job")
  };
  return (
    <div className="bg-gray-100 rounded p-10">
      <div className="flex items-center justify-between pb-5">
        <h4 className="text-[22px] font-semibold">Post Update Job</h4>
        <Link
          to="/profile/all-job"
          className="px-5 py-2 bg-primary text-white rounded"
        >
          All Job
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:flex items-center justify-between gap-5 mb-3">
          <div className="lg:w-1/2 lg:mb-0 mb-3">
            <label className="text-[15px] block mb-2">Job Title</label>
            <input
              type="text"
              placeholder="Job Title"
              defaultValue={filterData?.jobTitle}
              {...register("jobTitle", { required: true })}
              className="w-full py-[5px] rounded outline-0 px-3"
            />
          </div>
          <div className="lg:w-1/2">
            <label className="text-[15px] block mb-2">CompanyName</label>
            <input
              type="text"
              placeholder="Company Name"
              defaultValue={filterData?.companyName}
              {...register("companyName", { required: true })}
              className="w-full py-[5px] rounded outline-0 px-3"
            />
          </div>
        </div>
        <div className="lg:flex items-center justify-between gap-5 mb-3">
          <div className="lg:w-1/2 lg:mb-0 mb-3">
            <label className="text-[15px] block mb-2">Minimum Salary</label>
            <input
              type="text"
              placeholder="$ 50k"
              defaultValue={filterData?.minPrice}
              {...register("minPrice", { required: true })}
              className="w-full py-[5px] rounded outline-0 px-3"
            />
          </div>
          <div className="lg:w-1/2">
            <label className="text-[15px] block mb-2">Maximum Salary</label>
            <input
              type="text"
              placeholder="$ 150k"
              defaultValue={filterData?.maxPrice}
              {...register("maxPrice", { required: true })}
              className="w-full py-[5px] rounded outline-0 px-3"
            />
          </div>
        </div>
        <div className="lg:flex items-center justify-between gap-5 mb-3">
          <div className="lg:w-1/2 lg:mb-0 mb-3">
            <label className="text-[15px] block mb-2">Salary Type</label>
            <select
              {...register("salaryType", { required: true })}
              className="w-full py-[7px] rounded outline-0 px-3"
            >
              <option value={filterData?.salaryType}>
                {filterData?.salaryType}
              </option>
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="lg:w-1/2">
            <label className="text-[15px] block mb-2">Job Location</label>
            <input
              type="text"
              placeholder="New Yourk"
              defaultValue={filterData?.jobLocation}
              {...register("jobLocation", { required: true })}
              className="w-full py-[5px] rounded outline-0 px-3"
            />
          </div>
        </div>
        <div className="lg:flex items-center justify-between gap-5 mb-3">
          <div className="lg:w-1/2">
            <label className="text-lg block mb-2">Job Posting Date</label>
            <input
              type="date"
              defaultValue={filterData?.postingDate}
              {...register("postingDate", { required: true })}
              className="w-full py-[5px] rounded outline-0 px-3"
            />
          </div>
          <div className="lg:w-1/2 lg:mb-0 mb-3">
            <label className="text-[15px] block mb-2">Experience Level</label>
            <select
              {...register("experienceLevel", { required: true })}
              className="w-full py-[7px] rounded outline-0 px-3"
            >
              <option value={filterData?.experienceLevel}>
                {filterData?.experienceLevel}
              </option>
              <option value="any">Any Experience</option>
              <option value="internship">InternShip</option>
              <option value="remotely">Remotely</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="text-[15px] block mb-2">Employment Type</label>
          <select
            {...register("employmentType", { required: true })}
            className="w-full py-[7px] rounded outline-0 px-3"
          >
            <option value={filterData?.employmentType}>
              {filterData?.employmentType}
            </option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Temporary">Temporary</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="text-[15px] block mb-2">Job Description</label>
          <textarea
            {...register("description", { required: true })}
            defaultValue={filterData?.description}
            placeholder="ex: Description"
            id=""
            cols="30"
            rows="10"
            className="w-full py-[5px] rounded outline-0 px-3 resize-none"
          ></textarea>
        </div>
        <button
          type="Update"
          className="px-7 py-2 bg-blue bg-primary text-white rounded"
        >
          Add Job
        </button>
      </form>
    </div>
  );
}

export default UpdateJob;
