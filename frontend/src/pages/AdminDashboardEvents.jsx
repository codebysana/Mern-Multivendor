import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import AdminSidebar from "../components/admin/layout/AdminSidebar";
import AllEvents from "../components/admin/AllEvents";
const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={6} />
        </div>
        <AllEvents />
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
