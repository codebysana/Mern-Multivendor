import React from "react";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSidebar from "../../components/shop/layout/DashboardSidebar";
import CreateProduct from "../../components/shop/CreateProduct";

const ShopCreateProductPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProductPage;
