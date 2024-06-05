import React, { useEffect, useState } from "react";
import Container from "../../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

function JobList() {
  const { data: jobs = [], refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get(`https://job-hunter-server-rust.vercel.app/jobs`);
      return res.data;
    },
  });
  const [items, setItems] = useState([]);
  useEffect(() => {
    const filterItem = () => {
      return jobs.filter(item => item?.status === "approve");
    };
    setItems(filterItem());
  }, [jobs]);
  console.log(items);

  const filterData = item => {
    const updateItem = jobs.filter(curItem => {
      return curItem.employmentType === item;
    });
    setItems(updateItem);
  };

  return (
    <div className="pb-10">
      <Container>
        <h4 className="text-[36px] font-bold text-center pb-5">Job Listing</h4>
        <div className="pb-10">
          <ul className="flex flex-wrap items-center justify-center space-x-3">
            <button
              onClick={() => setItems(jobs)}
              className="bg-rose-600 text-white lg:mb-0 mb-3 px-5 py-[6px] rounded cursor-pointer"
            >
              All Jobs
            </button>
            <button
              onClick={() => filterData("Full-time")}
              className="bg-rose-600 lg:mb-0 mb-3 text-white px-5 py-[6px] rounded cursor-pointer"
            >
              Full Time
            </button>
            <button
              onClick={() => filterData("Part-time")}
              className="bg-rose-600 lg:mb-0 mb-3 text-white px-5 py-[6px] rounded cursor-pointer"
            >
              Part Time
            </button>
            <button
              onClick={() => filterData("Temporary")}
              className="bg-rose-600 text-white px-5 py-[6px] rounded cursor-pointer"
            >
              Temporary
            </button>
          </ul>
        </div>
        {items.map((item, index) => (
          <div key={index} className="bg-gray-50 shadow-md mb-7 rounded p-5">
            <div className="lg:flex gap-5 items-start justify-between">
              <div className="lg:w-[10%] w-full lg:pb-0 pb-3">
                <img src={item?.img} alt="" />
              </div>
              <div className="lg:w-[75%] w-full lg:pb-0 pb-3">
                <h4 className="text-[22px] font-semibold">{item?.jobTitle}</h4>
                <div className="flex items-center space-x-3 mt-3">
                  <span className="flex items-center gap-1">
                    <FaLocationDot /> {item?.jobLocation}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdOutlineWatchLater /> {item?.employmentType}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegMoneyBillAlt /> ${item?.minPrice} - ${item?.maxPrice}
                  </span>
                </div>
              </div>
              <div className="lg:w-[15%] w-full lg:pb-0 pb-3">
                <Link
                  to={`/jobDetails/${item?._id}`}
                  className="px-5 block py-2 mb-3 text-white rounded bg-primary"
                >
                  Apply Now
                </Link>
                <span className="flex items-center gap-1">
                  <SlCalender /> {item?.postingDate}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="py-5 text-center">
          <Link to="/jobs" className="px-5 py-2 bg-primary text-white rounded">Browse More Jobs</Link>
        </div>
      </Container>
    </div>
  );
}

export default JobList;
