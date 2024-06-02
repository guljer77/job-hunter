import React from "react";
import { FaEnvelopesBulk } from "react-icons/fa6";
import {
  FaHeadset,
  FaUser,
  FaChartLine,
  FaHandsHelping,
  FaBookReader,
} from "react-icons/fa";
import { MdOutlineBarChart, MdOutlineDesignServices } from "react-icons/md";
import { Link } from "react-router-dom";
import Container from "../../../Components/Container";

function Category() {
  return (
    <div className="py-20">
      <Container>
        <h4 className="text-center text-[36px] font-semibold">
          Explore By Category
        </h4>
        <div className="pt-10 lg:grid grid-cols-4 gap-5">
          <Link to="/" className="bg-gray-50 shadow-md block p-5 lg:mb-0 mb-5">
            <span className="text-primary text-[54px]">
              <FaEnvelopesBulk />
            </span>
            <h4 className="text-[18px] font-medium py-3">Marketing</h4>
            <p className="text-primary">123 Vacancy</p>
          </Link>
          <Link to="/" className="bg-gray-50 shadow-md p-5 block lg:mb-0 mb-5">
            <span className="text-primary text-[54px]">
              <FaHeadset />
            </span>
            <h4 className="text-[18px] font-medium py-3">Customer Service</h4>
            <p className="text-primary">123 Vacancy</p>
          </Link>
          <Link to="/" className="bg-gray-50 shadow-md p-5 block lg:mb-0 mb-5">
            <span className="text-primary text-[54px]">
              <FaUser />
            </span>
            <h4 className="text-[18px] font-medium py-3">Human Resource</h4>
            <p className="text-primary">123 Vacancy</p>
          </Link>
          <Link to="/" className="bg-gray-50 shadow-md p-5 block lg:mb-0 mb-5">
            <span className="text-primary text-[54px]">
              <MdOutlineBarChart />
            </span>
            <h4 className="text-[18px] font-medium py-3">Project Management</h4>
            <p className="text-primary">123 Vacancy</p>
          </Link>
          <Link to="/" className="bg-gray-50 shadow-md p-5 block lg:mb-0 mb-5">
            <span className="text-primary text-[54px]">
              <FaChartLine />
            </span>
            <h4 className="text-[18px] font-medium py-3">
              Business Development
            </h4>
            <p className="text-primary">123 Vacancy</p>
          </Link>
          <Link to="/" className="bg-gray-50 shadow-md p-5 block lg:mb-0 mb-5">
            <span className="text-primary text-[54px]">
              <FaHandsHelping />
            </span>
            <h4 className="text-[18px] font-medium py-3">Marketing</h4>
            <p className="text-primary">Sales & Communication</p>
          </Link>
          <Link to="/" className="bg-gray-50 shadow-md p-5 block lg:mb-0 mb-5">
            <span className="text-primary text-[54px]">
              <FaBookReader />
            </span>
            <h4 className="text-[18px] font-medium py-3">
              Teaching & Education
            </h4>
            <p className="text-primary">123 Vacancy</p>
          </Link>
          <Link to="/" className="bg-gray-50 shadow-md p-5 block lg:mb-0 mb-5">
            <span className="text-primary text-[54px]">
              <MdOutlineDesignServices />
            </span>
            <h4 className="text-[18px] font-medium py-3">Design & Creative</h4>
            <p className="text-primary">123 Vacancy</p>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Category;
