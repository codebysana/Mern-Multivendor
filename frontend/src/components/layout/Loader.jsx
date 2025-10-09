import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assests/animations/24151-ecommerce-animation.json";

const Loader = () => {
  const defaultOptions = {
    loop: false,
    autoPlay: false,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-sreen flex items-center justify-center">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default Loader;
