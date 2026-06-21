/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";

const ShopLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await axios
    //   .post(
    //     `${server}/shop/login-shop`,
    //     {
    //       email,
    //       password,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((res) => {
    //     toast.success("Login Successfully");
    //     navigate("/dashboard");
    //     // window.location.reload(true);
    //   })
    //   .catch((err) => {
    //     toast.error(err.response?.data?.message);
    //     // console.log(err);
    //   });

    try {
      const res = await axios.post(
        `${server}/shop/login-shop`,
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login Successfully");

      // store seller token for API requests (used when cookies aren't available)
      if (res.data && res.data.token) {
        localStorage.setItem("shop_token", res.data.token);
      }

      // dispatch LoadSellerSuccess locally and then ensure state by fetching from server
      dispatch({
        type: "LoadSellerSuccess",
        payload: res.data.seller || res.data.user || null,
      });

      // no need to manually navigate here, ShopLoginPage useEffect will do it
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#152942]">
          Login to your shop
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="black text-sm font-medium text-[#3e3e3eba]"
              >
                Email Address
              </label>
              <div className="mt-1 ">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#40B884] focus:border-[#40B884] sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="black text-sm font-medium text-[#3e3e3eba]"
              >
                Password
              </label>
              <div className="mt-1 relative ">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#40B884] focus:border-[#40B884] sm:text-sm"
                />

                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-[#40B884] focus:ring-[#40B884] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[#3e3e3eba]"
                >
                  Remember Me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-[#40B884] hover:text-[#3aa874]"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px- border-transparent text-sm font-medium rounded-md text-white bg-[#152942] hover:bg-[#40B884] "
              >
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/create-shop" className="text-[#40B884] pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;
