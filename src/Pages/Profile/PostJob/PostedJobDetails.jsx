import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function PostedJobDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const { data: jobs = [], refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/jobs/${user?.email}`);
      return res.data;
    },
  });
  const filterData = jobs?.find(item => item?._id === id);

  const {
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    jobLocation,
    postingDate,
    experienceLevel,
    description,
    skills,
  } = filterData;
  return (
    <div className="p-5 rounded bg-gray-100">
      <h4 className="text-[22px] font-semibold pb-5">Job Details</h4>
      <div>
        <h4>Job Title: {jobTitle}</h4>
        <h6>Company: {companyName}</h6>
        <h6>Salary Range: {minPrice}-{maxPrice}k</h6>
        <h6>Location: {jobLocation}</h6>
        <h6>Posted: {postingDate}</h6>
        <h6>Experience: {experienceLevel}</h6>
        <h6>Skills: {skills?.map((item, index)=>(<span key={index} className="block">{index+ 1}: {item?.value}</span>))}</h6>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default PostedJobDetails;
