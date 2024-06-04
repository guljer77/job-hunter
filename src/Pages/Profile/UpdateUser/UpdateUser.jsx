import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function UpdateUser() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `https://job-hunter-server-rust.vercel.app/users/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });
  console.log(users);
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        const { name, email, age, phone } = data;
        const userInfo = { name, email, age, phone, img: imgUrl };
        axios.patch(`https://job-hunter-server-rust.vercel.app/users/${user?.email}`, userInfo);
        toast.success("User Profile Update");
        navigate("/profile");
      });
  };
  return (
    <div className="p-10 bg-gray-100 rounded">
      <h4 className="text-[18px] font-semibold pb-5">UpdateProfile</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-4">
          <input
            type="text"
            defaultValue={users?.name}
            {...register("name", { required: true })}
            className="w-full px-3 py-[6px] rounded outline-0 border border-primary"
          />
        </div>
        <div className="pb-4">
          <input
            type="email"
            defaultValue={users?.email}
            {...register("email", { required: true })}
            className="w-full px-3 py-[6px] rounded outline-0 border border-primary"
          />
        </div>
        <div className="pb-4">
          <input
            type="number"
            placeholder="Enter Your Age"
            defaultValue={users?.age}
            {...register("age", { required: true })}
            className="w-full px-3 py-[6px] rounded outline-0 border border-primary"
          />
          {errors.age && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="pb-4">
          <input
            type="number"
            placeholder="Enter Your Phone Number."
            defaultValue={users?.phone}
            {...register("phone", { required: true })}
            className="w-full px-3 py-[6px] rounded outline-0 border border-primary"
          />
          {errors.phone && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="pb-4">
          <input
            type="file"
            {...register("image", { required: true })}
            className="w-full px-3 py-[6px] rounded outline-0 border border-primary"
          />
          <img
            src={users ? users?.img : user?.photoURL}
            alt=""
            className="w-[60px] block mt-3 h-[60px]"
          />
        </div>
        <div className="pb-4">
          <input
            type="submit"
            value={"Update"}
            className="px-5 py-[6px] bg-primary cursor-pointer rounded text-white"
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
