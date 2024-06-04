import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookSquare, FaLinkedinIn } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";

function SignUp() {
  const { user, userRegister, updateUser, googleAuthUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = data => {
    const fromData = new FormData();
    fromData.append("image", data.image[0]);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;

    fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then(res => res.json())
      .then(imageData => {
        const imgUrl = imageData.data.display_url;
        userRegister(data.email, data.password)
          .then(result => {
            updateUser(data.name, imgUrl)
              .then(() => {
                const userInfo = {
                  email: result?.user?.email,
                  name: result?.user?.displayName,
                  role: "user",
                };
                fetch(`https://job-hunter-server-rust.vercel.app/users/${result?.user?.email}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(userInfo),
                })
                  .then(res => res.json())
                  .then((data) => {
                    localStorage.setItem('token', data?.token)
                    navigate(from, { replace: true });
                  });
              })
              .catch(error => {
                console.log(error.message);
              });
          })
          .catch(error => {
            console.log(error.message);
          });
      });
  };

  const handleGoogle = () => {
    googleAuthUser()
      .then(result => {
        const userInfo = {
          email: result?.user?.email,
          name: result?.user?.displayName,
          role: "user",
        };
        fetch(`https://job-hunter-server-rust.vercel.app/users/${result?.user?.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then(res => res.json())
          .then((data) => {
            localStorage.setItem('token', data?.token)
            navigate(from, { replace: true });
          });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-2/5 h-auto bg-gray-100 shadow-md rounded-sm text-center p-20">
        <h4 className="text-[20px] font-semibold text-primary">
          Welcome to Carrier
        </h4>
        <h5 className="text-[16px] font-medium mb-5">Sign Up</h5>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                placeholder="Enter Your Name"
                {...register("name", { required: true })}
                className="outline-0 py-2 px-3 w-full border border-primary mb-3 rounded-sm"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600 py-2">Name is Required</p>
              )}
            </div>
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
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                className="outline-0 py-2 px-3 w-full border border-primary mb-3 rounded-sm"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is Required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password Must be 8 Characters</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Must be a UpperCase and lowercase and number and Special
                  Characters
                </p>
              )}
            </div>
            <div>
              <input
                type="file"
                {...register("image", { required: true })}
                className="outline-0 py-2 px-3 w-full border border-primary mb-3 rounded-sm"
              />
              {errors.image?.type === "required" && (
                <p className="text-red-600 py-2">Image is Required</p>
              )}
            </div>
            <div className="mt-3">
              <input
                type="submit"
                value="Continue"
                className="w-full cursor-pointer bg-primary py-2 rounded-sm text-white"
              />
            </div>
            <p className="text-center py-3">
              Already Have an Account? please
              <Link to="/login" className="text-blue-600 pl-1">
                Login
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
          <Link
            onClick={handleGoogle}
            className="w-[35px] h-[35px] border border-primary text-[20px] flex items-center justify-center text-primary rounded-full"
          >
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

export default SignUp;
