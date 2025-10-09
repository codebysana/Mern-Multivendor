import React from "react";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[100vh] 800px:min-h-[100vh] 800px:bg-center w-full bg-no-repeat bg-center ${styles.normalFlex}`}
      style={{
        backgroundImage: "url(bg-image-1.png)",
        width: "100%",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] captilize`}
        >
          Best Collection for <br /> Home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-Poppins leading-7 tracking-wider font-[400] text-[#000000ba] w-[60%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quis
          eveniet officia velit veritatis quo ducimus expedita assumenda non,
          laudantium nisi rerum recusandae in excepturi blanditiis architecto
          rem. Libero?
        </p>{" "}
        <p className="pt-5 text-[16px] font-Poppins leading-7 tracking-wider font-[400] text-[#000000ba] w-[60%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quis
          eveniet officia velit veritatis quo ducimus expedita assumenda non,
          laudantium nisi rerum recusandae in excepturi blanditiis architecto
          rem. Libero?
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
