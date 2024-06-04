import React from "react";
import Container from "../../../Components/Container";

function NewsLetter() {
  return (
    <div className="pb-10">
      <Container>
        <div className="bg-gray-50 rounded p-10 shadow-md">
          <h4 className="text-[36px] uppercase font-semibold text-center">
            Newsletter
          </h4>
          <p className="text-center text-[15px] font-light">
            Keep up our latest job news subscribe our news letter
          </p>
          <form>
            <div className="flex items-center justify-center mt-5">
              <div className="flex items-center w-2/4 gap-2 justify-center">
                <input
                  type="text"
                  placeholder="Email Address.."
                  className="lg:w-[70%] py-2 px-3 outline-0 border border-primary rounded"
                />
                <input
                  type="submit"
                  value="SUBSCRIBE"
                  className="lg:w-[30%] bg-primary text-white py-2 rounded cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default NewsLetter;
