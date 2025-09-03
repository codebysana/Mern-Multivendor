import React from "react";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import ShopSettings from "../../components/shop/ShopSettings.jsx";
import DashboardSidebar from "../../components/shop/layout/DashboardSidebar.jsx";
const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingsPage;
