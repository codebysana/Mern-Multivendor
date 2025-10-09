import React from "react";
import styles from "../../styles/style";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <marquee>
        <div className="flex justify-between w-full">
          <div className="flex items-start">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png"
              alt="Dell Logo"
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />
          </div>
          <div className="flex items-start">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png"
              alt="Microsoft Logo"
              style={{ width: "160px", height: "160px", objectFit: "contain" }}
            />
          </div>
          <div className="flex items-start">
            <img
              src="https://www.pngmart.com/files/23/Lg-Logo-PNG-HD.png"
              alt="LG Logo"
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />
          </div>
          <div className="flex items-start">
            <img
              src="https://1000logos.net/wp-content/uploads/2017/06/Sony-Logo.jpg"
              alt="Sony Logo"
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />
          </div>

          <div className="flex items-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCvh-j7HsTHJ8ZckknAoiZMx9VcFmsFkv72g&s"
              alt="Apple Logo"
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
          </div>
        </div>
      </marquee>
    </div>
  );
};

export default Sponsored;
