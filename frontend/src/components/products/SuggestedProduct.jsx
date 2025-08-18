import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/style";
import ProductCard from "../route/productCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const data =
      productData &&
      productData.filter((item) => item.category === data.category);
    setProducts(data);
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
            {products &&
              products.map((item, index) => {
                <ProductCard data={item} key={index} />;
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
