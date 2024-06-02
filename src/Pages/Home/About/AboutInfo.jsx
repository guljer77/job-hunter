import React from "react";
import Image1 from "../../../assets/about-1.jpg";
import Image2 from "../../../assets/about-2.jpg";
import Image3 from "../../../assets/about-3.jpg";
import Image4 from "../../../assets/about-4.jpg";
import { FaCheck } from "react-icons/fa";
import Container from "../../../Components/Container";

function AboutInfo() {
  return (
    <div>
      <Container>
        <div className="pb-20 lg:flex items-center justify-between gap-5">
          <div className="lg:w-1/2 w-full lg:mb-0 mb-5 grid grid-cols-2">
            <div>
              <img src={Image1} alt="" />
            </div>
            <div>
              <img src={Image2} alt="" />
            </div>
            <div>
              <img src={Image3} alt="" />
            </div>
            <div>
              <img src={Image4} alt="" />
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <h4 className="pb-5 lg:text-[42px] font-bold">
              We Help To Get The Best Job And Find A Talent
            </h4>
            <p className="pb-5 text-[16px] font-light">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </p>
            <ul className="pb-5">
              <li className="flex items-center gap-3">
                <FaCheck className="text-primary" />
                <span>Tempor erat elitr rebum at clita</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheck className="text-primary" />
                <span>Aliqu diam amet diam et eos</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheck className="text-primary" />
                <span>Clita duo justo magna dolore erat amet</span>
              </li>
            </ul>
            <button className="inline-block px-5 py-2 rounded bg-primary text-white">
              Read More
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AboutInfo;
