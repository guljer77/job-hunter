import React from "react";
import "./banner.css";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from 'react-icons/fa6';
import Container from "../../../Components/Container";

function Banner() {
  return (
    <div className="banner-bg">
      <Container>
        <div className="w-full h-[90vh] flex items-center justify-start">
          <div className="text-white">
            <h2 className="lg:text-[48px] text-[28px] pb-3 font-bold lg:w-2/4 w-full">
              Find The Perfect Job That You Deserved
            </h2>
            <p className="text-15px lg:w-2/5 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur iure placeat repellat voluptatem sit porro et odit
              mollitia numquam voluptate.
            </p>
            <Link
              to="/profile"
              className="text-[16px] inline-block mt-5 text-white rounded font-semibold bg-primary px-5 py-3"
            >
              Search A Job <FaArrowRightLong className="inline-block" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Banner;
