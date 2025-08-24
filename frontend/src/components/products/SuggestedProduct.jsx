import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/style";
import ProductCard from "../route/productCard/ProductCard";
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.allProducts);
  const [productData, setProductData] = useState();
  useEffect(() => {
    const val =
      allProducts &&
      allProducts.filter((item) => item.category === data.category);
    setProductData(val);
  }, []);
  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] mmd:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
            {productData &&
              productData.map((item, index) => {
                <ProductCard data={item} key={index} />;
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
