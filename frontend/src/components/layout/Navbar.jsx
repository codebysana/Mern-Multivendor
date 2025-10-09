import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import { navItems } from "../../static/data";
import { Link, useLocation } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
const Navbar = ({ active }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const tokenExists = document.cookie.includes("token");

      if (!tokenExists) {
        return;
      }

      try {
        const response = await axios.get(`${server}/user/get-user`, {
          withCredentials: true,
        });

        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        if (err.response?.status !== 401) {
          setError(err.response?.data?.message || "Something went wrong");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className={`block 800px:${styles.normalFlex}`}>
        {navItems &&
          navItems.map((item, index) => (
            <div className="flex" key={index}>
              <Link
                to={item.url}
                className={`${
                  active === index + 1
                    ? "text-[#17dd1f]"
                    : "text-black 800px:text-[#fff] pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer "
                }`}
              >
                {item.title}
              </Link>
            </div>
          ))}
      </div>
      {/* Only show real errors, not unauthenticated */}
      {error && user && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default Navbar;
