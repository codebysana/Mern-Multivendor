import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/style";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/route/productCard/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../components/layout/Loader";
import Footer from "../components/layout/Footer";
import { productData } from "../static/data";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // Create a copy before sorting (avoids "read-only" mutation error)
      const sortedProducts = [...allProducts].sort(
        (a, b) => b.soldOut - a.soldOut
      );
      setData(sortedProducts);
    } else {
      // Fallback: use static productData if DB products are empty
      const sortedStatic = [...productData].sort(
        (a, b) => b.totalSell - a.totalSell
      );
      setData(sortedStatic);
    }
  }, [allProducts]);

  // useEffect(() => {
  //   if (categoryData === null) {
  //     const val =
  //       allProducts && allProducts.sort((a, b) => a.soldOut - b.soldOut);
  //     setData(val);
  //   } else {
  //     const val =
  //       allProducts && allProducts.filter((i) => i.category === categoryData);
  //     setData(val);
  //   }
  //   // window.scrollY(0, 0);
  // }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data && data?.length > 0 ? (
                data?.map((i, index) => <ProductCard data={i} key={index} />)
              ) : (
                <div className="col-span-full flex justify-center items-center py-10">
                  <h1 className="text-center w-full pb-[110px] text-[20px]">
                    No Products Found in {categoryData}
                  </h1>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
