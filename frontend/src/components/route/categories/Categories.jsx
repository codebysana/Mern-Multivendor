import React from "react";
import styles from "../../../styles/style";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={
            "branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md"
          }
        >
          {brandingData &&
            brandingData?.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-base ">{i.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <h2 className={`${styles.heading}`}>Categories</h2>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData?.map((i: any) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[150px] my-5 flex flex-col items-center justify-between cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i.title)}
                >
                  
                  <img
                    src={i.imageUrl}
                    alt={i.title}
                    className="w-[120px] object-cover"
                  />{" "}
                  {/* <h5 className={`text-[18px] leading-[1.3] `}>{i.title}</h5> */}
                  <h5 className="text-lg font-medium text-gray-700">
                    {i.title}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
