import React from "react";
import { Helmet } from "react-helmet-async";
import CommonBanner from "../../Components/CommonBanner/CommonBanner";
import Container from "../../Components/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import { toast } from "react-toastify";

function JobDetails() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get(
        `https://job-hunter-server-rust.vercel.app/jobs`
      );
      return res.data;
    },
  });
  const { id } = useParams();
  const detailsData = jobs.find(item => item?._id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const { name, email, website, resume, coverLetter } = data;
    const newItem = {
      name,
      email,
      website,
      resume,
      coverLetter,
      id: detailsData?._id,
      email: user?.email,
      status: "Under Review",
    };
    axios.post(`https://job-hunter-server-rust.vercel.app/application`, newItem);
    toast.success("Job Applied Successfully");
    navigate("/profile");
  };

  return (
    <div>
      <Helmet>
        <title>Job Hunter | Job Details</title>
      </Helmet>
      <CommonBanner heading={"Job Details"} />
      <Container>
        <div className="pt-16 pb-10 lg:flex items-start justify-between gap-5">
          <div className="lg:mb-0 mb-5 lg:w-3/4">
            <div className="lg:flex items-center justify-between">
              <div className="lg:w-[15%] w-full lg:pb-0 pb-3">
                <img src={detailsData?.img} alt="" />
              </div>
              <div className="lg:w-[85%] w-full lg:pb-0 pb-3">
                <h4 className="text-[24px] font-semibold">
                  {detailsData?.jobTitle}
                </h4>
                <div className="flex items-center space-x-3 mt-3">
                  <span className="flex items-center gap-1">
                    <FaLocationDot className="text-primary" />{" "}
                    {detailsData?.jobLocation}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdOutlineWatchLater className="text-primary" />{" "}
                    {detailsData?.employmentType}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegMoneyBillAlt className="text-primary" /> $
                    {detailsData?.minPrice} - ${detailsData?.maxPrice}
                  </span>
                </div>
              </div>
            </div>
            <h4 className="text-[26px] font-bold py-4">Job Description</h4>
            <p className="mb-10">{detailsData?.description}</p>
            <h4 className="text-[26px] font-bold py-4">Responsibility</h4>
            <p className="">{detailsData?.description}</p>
          </div>
          <div className="lg:mb-0 mb-5 lg:w-1/4">
            <div className="bg-primary/10 rounded p-5 mb-10">
              <h6 className="text-[20px] font-semibold pb-5">Job Summery</h6>
              <p className="flex items-center pb-3 gap-1">
                <FaAngleRight className="text-primary" /> Published On:{" "}
                {detailsData?.postingDate}
              </p>
              <p className="flex items-center pb-3 gap-1">
                <FaAngleRight className="text-primary" /> Vacancy: 123 Position
              </p>
              <p className="flex items-center pb-3 gap-1">
                <FaAngleRight className="text-primary" /> Job Nature:{" "}
                {detailsData?.employmentType}
              </p>
              <p className="flex items-center pb-3 gap-1">
                <FaAngleRight className="text-primary" /> Salary: $
                {detailsData?.minPrice} - ${detailsData?.maxPrice}
              </p>
              <p className="flex items-center pb-3 gap-1">
                <FaAngleRight className="text-primary" /> Location: $
                {detailsData?.jobLocation}
              </p>
              <p className="flex items-center pb-3 gap-1">
                <FaAngleRight className="text-primary" /> Date Line: 01 Jan,
                2045
              </p>
            </div>
            <div className="bg-primary/10 rounded p-5 mb-10">
              <h6 className="text-[20px] font-semibold pb-5">Company Detail</h6>
              <p className="text-[15px] font-light">
                Ipsum dolor ipsum accusam stet et et diam dolores, sed rebum
                sadipscing elitr vero dolores. Lorem dolore elitr justo et no
                gubergren sadipscing, ipsum et takimata aliquyam et rebum est
                ipsum lorem diam. Et lorem magna eirmod est et et sanctus et,
                kasd clita labore.
              </p>
            </div>
          </div>
        </div>
        <div className="pb-16">
          <h4 className="text-[26px] font-bold py-4">Apply For The Job</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="lg:w-3/4 w-full">
            <div className="lg:flex items-center justify-between lg:mb-4 mb-0 gap-3">
              <div className="lg:mb-0 mb-4 lg:w-[50%] w-full">
                <input
                  type="text"
                  placeholder="Your Name."
                  {...register("name", { required: true })}
                  className="w-full block outline-0 px-3 py-[6px] border border-primary"
                />
                {errors.name && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="lg:mb-0 mb-4 lg:w-[50%] w-full">
                <input
                  type="email"
                  placeholder="Your Email."
                  {...register("email", { required: true })}
                  className="w-full block outline-0 px-3 py-[6px] border border-primary"
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
            </div>
            <div className="lg:flex items-center justify-between lg:mb-4 mb-0 gap-3">
              <div className="lg:mb-0 mb-4 lg:w-[50%] w-full">
                <input
                  type="text"
                  placeholder="Portfolio Website."
                  {...register("website", { required: true })}
                  className="w-full block outline-0 px-3 py-[6px] border border-primary"
                />
                {errors.website && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="lg:mb-0 mb-4 lg:w-[50%] w-full">
                <input
                  type="text"
                  placeholder="ex: cv.link here"
                  {...register("resume", { required: true })}
                  className="w-full block outline-0 px-3 py-[4px] border border-primary"
                />
                {errors.resume && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
            </div>
            <div className="mb-5">
              <textarea
                name=""
                id=""
                placeholder="Cover letter.."
                {...register("coverLetter", { required: true })}
                className="w-full h-[180px] block outline-0 px-3 py-[6px] border border-primary"
              />
              {errors.coverLetter && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div>
              {user ? (
                <input
                  type="submit"
                  value={"Apply Now"}
                  className="bg-primary cursor-pointer text-white w-full py-[6px] rounded"
                />
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-[6px] bg-primary text-white rounded"
                >
                  Login First Then You Are Apply
                </Link>
              )}
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default JobDetails;
