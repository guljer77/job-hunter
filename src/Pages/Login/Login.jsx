import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookSquare, FaLinkedinIn } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";

function Login() {
  const { loginUserSet, googleAuthUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = data => {
    loginUserSet(data.email, data.password)
      .then(() => {
        // const userInfo = {
        //   email: result?.user?.email,
        //   name: result?.user?.displayName,
        // };
        // axios.put(
        //   `http://localhost:5000/users/${result?.user?.email}`,
        //   userInfo
        // );
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const handleGoogle = () => {
    googleAuthUser()
      .then(() => {
        // const userInfo = {
        //   email: result?.user?.email,
        //   name: result?.user?.displayName,
        // };
        // axios.put(
        //   `http://localhost:5000/users/${result?.user?.email}`,
        //   userInfo
        // );
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-2/5 h-auto bg-gray-100 shadow-md rounded-sm text-center p-20">
        <h4 className="text-[20px] font-semibold text-primary">
          Welcome to Carrier
        </h4>
        <h5 className="text-[16px] font-medium mb-5">Login</h5>
        <div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
                className="outline-0 py-2 px-3 w-full border border-primary mb-3 rounded-sm"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600 py-2">Email is Required</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Your Password"
                {...register("password", { required: true })}
                className="outline-0 py-2 px-3 w-full border border-primary mb-3 rounded-sm"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Please Enter Password</p>
              )}
            </div>
            <div className="mt-3">
              <input
                type="submit"
                value="Login"
                className="w-full cursor-pointer bg-primary py-2 rounded-sm text-white"
              />
            </div>
            <p className="text-center py-3">
              Are you new here? please
              <Link to="/signUp" className="text-blue-600 pl-1">
                SignUp
              </Link>
            </p>
          </form>
          <hr className="border border-gray-300 mt-3" />
          <p className="bg-gray-100 w-[40px] h-[30px] mx-auto font-medium relative -top-[14px]">
            Or
          </p>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <Link className="w-[35px] h-[35px] border border-primary text-[20px] flex items-center justify-center text-primary rounded-full">
            <FaFacebookSquare />
          </Link>
          <Link onClick={handleGoogle} className="w-[35px] h-[35px] border border-primary text-[20px] flex items-center justify-center text-primary rounded-full">
            <FaGoogle />
          </Link>
          <Link className="w-[35px] h-[35px] border border-primary text-[20px] flex items-center justify-center text-primary rounded-full">
            <FaLinkedinIn />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
