import React, { useEffect, useState } from "react";
import styles from "../styles/style";
import Header from "../components/layout/Header";
import ProductCard from "../components/route/productCard/ProductCard";
import { productData } from "../static/data";
import Footer from "../components/layout/Footer";
import { useSelector } from "react-redux";
import Loader from "../components/layout/Loader";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    if (productData && productData.length > 0) {
      // Create a copy before sorting
      const sortedData = [...productData].sort(
        (a, b) => b.totalSell - a.totalSell
      );
      setData(sortedData);
    }
  }, []);

  // useEffect(() => {
  //   if (productData && productData.length > 0) {
  //     const sortedData =
  //       productData && productData?.sort((a, b) => b.totalSell - a.totalSell);
  //     setData(sortedData);
  //   }
  // }, []);

  // useEffect(() => {
  //   const allProductsData = allProducts ? [...allProducts] : [];
  //   const sortedData = allProductsData?.sort((a, b) => b.soldOut - a.soldOut);
  //   setData(sortedData);
  // }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data && data.length > 0 ? (
                data?.map((i, index) => <ProductCard data={i} key={index} />)
              ) : (
                <p className="text-center w-full col-span-full">
                  No products found
                </p>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
