import React, { useEffect } from "react";
import ShopCreate from "../components/shop/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// shop create page

const ShopPage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopPage;
