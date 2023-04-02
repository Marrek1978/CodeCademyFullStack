import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/api";
import { Navigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (credentials) => {
    console.log("in onsubmit", credentials);

    const login = await loginUser(credentials);
    login.loggedIn && setRedirect(true);
  
  };

  //redirect to profile page.
  return (
    <>
      {redirect && <Navigate replace to="/customers" />}
      <article className="w-full  px-5 py-10">
        <section className="m-auto max-w-md ">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="w-full">
              <div
                className="
              grid grid-cols-[100px_2fr] items-center gap-3
              m-auto max-w-md 
               "
              >
                <label
                  className="text-gray-600 font-bold md:text-right 
                mb-1 md:mb-0 pr-8"
                  for="username"
                >
                  Username
                </label>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 "
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 5,
                      message: "Username min length is 5 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Username max length is 30 characters",
                    },
                  })}
                  type="text"
                  placeholder="JaneDoe1982"
                />
                <div></div>
                <div className="text-[#e91111] font-medium text-sm">
                  {errors.username?.message}
                </div>

                <label
                  className="text-gray-600 font-bold md:text-right 
                mb-1 md:mb-0 pr-8"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 "
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password min length is 5 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Password max length is 30 characters",
                    },
                  })}
                  type="password"
                  placeholder="**********"
                />
                <div></div>
                <div className="text-[#e91111] font-medium text-sm">
                  {errors.password?.message}
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="LOGIN"
              className="bg-key rounded py-3 px-5 text-white font-bold uppercase mt-10"
            />
          </form>
        </section>
      </article>
    </>
  );
}

export default Login;
