import React, { useEffect, useState } from "react";
import styles from "../styles/style";
import Header from "../components/layout/Header";
import ProductCard from "../components/route/productCard/ProductCard";
import { productData } from "../static/data";

const BestSellingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data =
      productData && productData.sort((a, b) => b.totalSell - a.totalSell);
    setData(data);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestSellingPage;
