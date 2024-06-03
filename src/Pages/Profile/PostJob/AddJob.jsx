import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { toast } from "react-toastify";

function AddJob() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    const fromData = new FormData();
    fromData.append("image", data.image[0]);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;

    fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then(res => res.json())
      .then(imageData => {
        const imgUrl = imageData.data.display_url;
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
          img: imgUrl,
          email: user?.email,
          skills: selectedOption,
          status: "pending",
        };
        axios.post(`http://localhost:5000/jobs`, jobInfo);
        toast.success("Job Post Success");
        navigate("/profile/all-job");
      });
  };
  const options = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Tailwind CSS", label: "Tailwind CSS" },
    { value: "Bootstrap CSS", label: "Bootstrap CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "ES6", label: "ES6" },
    { value: "React.Js", label: "React.Js" },
    { value: "Next.JS", label: "Next.JS" },
    { value: "Firebase", label: "Firebase" },
    { value: "Redux", label: "Redux" },
    { value: "Axios", label: "Axios" },
    { value: "Node.Js", label: "Node.Js" },
    { value: "Express.Js", label: "Express.Js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "JWT", label: "JWT" },
  ];
  return (
    <div className="bg-gray-100 rounded p-10">
      <div className="flex items-center justify-between pb-5">
        <h4 className="text-[22px] font-semibold">Post Add Job</h4>
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
              {...register("jobTitle", { required: true })}
              className="w-full py-[5px] rounded outline-0 px-3"
            />
          </div>
          <div className="lg:w-1/2">
            <label className="text-[15px] block mb-2">CompanyName</label>
            <input
              type="text"
              placeholder="Company Name"
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
              {...register("minPrice", { required: true })}
              className="w-full py-[5px] rounded outline-0 px-3"
            />
          </div>
          <div className="lg:w-1/2">
            <label className="text-[15px] block mb-2">Maximum Salary</label>
            <input
              type="text"
              placeholder="$ 150k"
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
              <option value="">Choose Salary Type</option>
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
              <option value="">Choose Your Experience</option>
              <option value="any">Any Experience</option>
              <option value="internship">InternShip</option>
              <option value="remotely">Remotely</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="text-[15px] block mb-2">Required Skill</label>
          <CreatableSelect
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            isMulti
            className="outline-0"
          />
        </div>
        <div className="lg:flex items-center justify-between gap-5 mb-3">
          <div className="lg:w-1/2 lg:mb-0 mb-3">
            <label className="text-[15px] block mb-2">Company Logo</label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="w-full py-[5px] rounded outline-0 px-3 border border-gray-100 bg-white"
            />
          </div>
          <div className="lg:w-1/2">
            <label className="text-[15px] block mb-2">Employment Type</label>
            <select
              {...register("employmentType", { required: true })}
              className="w-full py-[7px] rounded outline-0 px-3"
            >
              <option value="">Select your job type?</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="text-[15px] block mb-2">Job Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="ex: Description"
            id=""
            cols="30"
            rows="10"
            className="w-full py-[5px] rounded outline-0 px-3 resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-7 py-2 bg-blue bg-primary text-white rounded"
        >
          Add Job
        </button>
      </form>
    </div>
  );
}

export default AddJob;
