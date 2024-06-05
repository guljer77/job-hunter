import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CommonBanner from "../../Components/CommonBanner/CommonBanner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import Container from "../../Components/Container";

function JobListing() {
  const { data: jobs = [], refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get(
        `https://job-hunter-server-rust.vercel.app/jobs`
      );
      return res.data;
    },
  });
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
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

  //search
  const searchResult = event => {
    const searchFilter = event.target.value;
    setSearch(searchFilter);
    const filterData = jobs.filter(item =>
      item?.jobTitle.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setItems(filterData);
  };

  return (
    <div className="">
      <Helmet>
        <title>Job Hunter | Job Listing Page</title>
      </Helmet>
      <CommonBanner heading={"Job Listing"} />
      <Container>
        <div className="py-10 lg:flex items-center justify-between">
          <ul className="flex flex-wrap items-center lg:mb-0 mb-5 justify-center space-x-3">
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
          <div>
            <form>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={searchResult}
                  placeholder="Search Your Dream Job."
                  className="py-2 px-2 rounded outline-0 border border-primary"
                />
                <input
                  type="submit"
                  value="Search"
                  className="px-5 py-2 bg-primary text-white rounded"
                />
              </div>
            </form>
          </div>
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
      </Container>
    </div>
  );
}

export default JobListing;
