import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import AdminSidebar from "../components/admin/layout/AdminSidebar";
import AllWithdraw from "../components/admin/AllWithdraw"
const AdminDashboardWithdraw = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={7} />
          </div>
          <AllWithdraw />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
