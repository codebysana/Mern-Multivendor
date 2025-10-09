import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/route/hero/Hero";
import Categories from "../components/route/categories/Categories";
import BestDeals from "../components/route/deals/BestDeals";
import FeaturedProduct from "../components/route/featuredProduct/FeaturedProduct";
import Events from "../components/events/Events";
import Sponsored from "../components/route/Sponsored";
import Footer from "../components/layout/Footer.jsx";
import { getAllProducts } from "../redux/actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import { productData } from "../static/data.js";
import { useState } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts?.length > 0) {
      setProducts(allProducts);
    } else {
      setProducts(productData); // ✅ fallback
    }
  }, [allProducts]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
