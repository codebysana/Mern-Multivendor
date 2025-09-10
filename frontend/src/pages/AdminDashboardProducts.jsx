import React from "react";
import AdminHeader from "../components/layout/AdminHeader";
import AdminSidebar from "../components/admin/layout/AdminSidebar";
import AllProducts from "../components/admin/AllProducts"
const AdminDashboardProducts = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={5} />
        </div>
        <AllProducts />
      </div>
    </div>
  );
};

export default AdminDashboardProducts;
