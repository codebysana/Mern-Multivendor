import React from "react";
import Header from "../components/layout/Header";
import Hero from "../components/route/hero/Hero";
import Categories from "../components/route/categories/Categories";
import BestDeals from "../components/route/deals/BestDeals"
function HomePage() {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals/>
    </div>
  );
}

export default HomePage;
