import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineLogout, HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/shop/logout`, { withCredentials: true });
      dispatch({ type: "sellerLogout" });
      localStorage.removeItem("shop_token");
      toast.success("Logout Successfully");
      navigate("/login-shop");
    } catch (error) {
      console.error("Logout Failed", error?.response?.data?.message);
      toast.error("Logout failed. Try Again");
    }
  };

  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      {/* orders */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      {/* products */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiPackage size={30} color={`${active === 3 ? "#40B884" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      {/*create product  */}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      {/* All Events */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      {/* create event */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile
            size={30}
            color={`${active === 6 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      {/* withdraw  money*/}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      {/* inbox */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      {/* coupons */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupons" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            Coupon Codes
          </h5>
        </Link>
      </div>

      {/* refunds */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      {/* settings */}
      <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 11 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
      {/* logout */}
      <div className="w-full flex items-center p-4">
        <div
          onClick={() => logoutHandler()}
          className="w-full flex items-center cursor-pointer"
        >
          <HiOutlineLogout
            size={30}
            color={`${active === 12 ? "#40B884" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 12 ? "text-[#40B884]" : "text-[#555]"
            }`}
          >
            Logout
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
