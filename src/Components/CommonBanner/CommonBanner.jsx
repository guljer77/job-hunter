import React from "react";
import "./common.css";
import Container from "../Container";
import { Link } from "react-router-dom";

function CommonBanner({heading}) {
  return <div className="banner">
    <Container>
      <div className="flex items-center justify-start w-full h-[60vh]">
        <div>
          <h4 className="text-[32px] font-extrabold text-white">{heading}</h4>
          <span className="text-[16px] uppercase font-normal text-white"><Link to="/" className="text-primary text-[16px]">Home</Link> / {heading}</span>
        </div>
      </div>
    </Container>
  </div>;
}

export default CommonBanner;
