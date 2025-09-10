import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import AdminSidebar from "../components/admin/layout/AdminSidebar";
import AllSellers from "../components/admin/AllSellers";

const AdminDashboardSellers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={3} />
        </div>
        <AllSellers />
      </div>
    </div>
  );
};

export default AdminDashboardSellers;
