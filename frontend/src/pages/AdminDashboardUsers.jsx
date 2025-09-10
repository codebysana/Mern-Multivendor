import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import AdminSidebar from "../components/admin/layout/AdminSidebar";
import AllUsers from "../components/admin/AllUsers";
const AdminDashboardUsers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={4} />
        </div>
        <AllUsers />
      </div>
    </div>
  );
};

export default AdminDashboardUsers;