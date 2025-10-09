import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetails from "../components/products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestedProduct from "../components/products/SuggestedProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import { getAllEvents } from "../redux/actions/eventAction";
import { productData } from "../static/data";
import { eventDataStatic } from "../static/data";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const dispatch = useDispatch();

  console.log("Params Id: ", id);
  console.log("All Products", allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
    console.log("Looking for id:", id, productData);
    dispatch(getAllEvents());
  }, [dispatch]);

  console.log("All Products", allProducts);

  useEffect(() => {
    console.log(" All Products:", allProducts);
  }, [allProducts]);

  useEffect(() => {
    console.log("Looking for id:", id, productData);
    if (eventData === "true") {
      let event = allEvents?.find((i) => i._id === id);
      if (!event) {
        event = eventDataStatic?.find((i) => i._id === id || i.id === id);
      }
      setData(event || null);
    } else {
      let product = allProducts?.find((i) => i._id === id);
      if (!product) {
        product = productData?.find(
          (i) => String(i._id) === String(id) || String(i.id) === String(id)
        );
      }
      setData(product || null);
    }
  }, [allEvents, allProducts, id, eventData]);

  return (
    <div>
      <Header />
      {data ? (
        <ProductDetails data={data} />
      ) : (
        <p className="text-center py-10">
          {allProducts?.length === 0 && allEvents?.length === 0
            ? "Loading Products..."
            : "Product not found"}
        </p>
      )}
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
