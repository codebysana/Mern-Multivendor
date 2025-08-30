import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetails from "../components/products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestedProduct from "../components/products/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((item) => item._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((item) => item._id === id);
      setData(data);
    }
  }, [allEvents, allProducts]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && (
        <>
        {data && <SuggestedProduct data={data} />}
        </>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
